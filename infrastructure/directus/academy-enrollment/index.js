
import { randomUUID } from 'node:crypto';

const RETRYABLE_DB_ERRORS = new Set([
  'ER_LOCK_DEADLOCK',
  'ER_LOCK_WAIT_TIMEOUT'
]);

const MAX_TRANSACTION_ATTEMPTS = 3;

async function withTransactionRetry(database, operation) {
  for (let attempt = 1; attempt <= MAX_TRANSACTION_ATTEMPTS; attempt++) {
    try {
      return await database.transaction(operation);
    } catch (error) {
      const retryable =
        RETRYABLE_DB_ERRORS.has(error.code) ||
        error.errno === 1213 ||
        error.errno === 1205;

      if (!retryable || attempt === MAX_TRANSACTION_ATTEMPTS) {
        throw error;
      }

      await new Promise(resolve =>
        setTimeout(resolve, 100 * attempt)
      );
    }
  }
}

const NOTICE_VERSION = 'test-v1';

const ALLOWED_FIELDS = new Set([
  'first_name',
  'last_name',
  'email',
  'phone',
  'course_slug',
  'privacy_notice_version',
  'privacy_notice_acknowledged',
  'marketing_consent'
]);

const MAX_LENGTHS = {
  first_name: 100,
  last_name: 100,
  email: 254,
  phone: 30,
  course_slug: 150,
  privacy_notice_version: 50
};

function validateEnrollment(body) {
  const errors = {};

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      valid: false,
      errors: { body: 'Il corpo deve essere un oggetto JSON.' }
    };
  }

  for (const field of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(field)) {
      errors[field] = 'Campo non consentito.';
    }
  }

  for (const field of [
    'first_name',
    'last_name',
    'email',
    'course_slug',
    'privacy_notice_version'
  ]) {
    if (typeof body[field] !== 'string' || !body[field].trim()) {
      errors[field] = 'Campo obbligatorio.';
    }
  }

  for (const [field, maxLength] of Object.entries(MAX_LENGTHS)) {
    if (body[field] !== undefined && body[field] !== null) {
      if (typeof body[field] !== 'string') {
        errors[field] = 'Deve essere una stringa.';
      } else if (body[field].trim().length > maxLength) {
        errors[field] = `Massimo ${maxLength} caratteri.`;
      }
    }
  }

  if (
    typeof body.email === 'string' &&
    body.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
  ) {
    errors.email = 'Indirizzo email non valido.';
  }

  if (
    typeof body.course_slug === 'string' &&
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.course_slug)
  ) {
    errors.course_slug = 'Slug non valido.';
  }

  if (body.privacy_notice_acknowledged !== true) {
    errors.privacy_notice_acknowledged =
      'È necessario confermare la presa visione dell’informativa.';
  }

  if (body.privacy_notice_version !== NOTICE_VERSION) {
    errors.privacy_notice_version =
      'Versione dell’informativa non valida.';
  }

  if (
    body.marketing_consent !== undefined &&
    typeof body.marketing_consent !== 'boolean'
  ) {
    errors.marketing_consent = 'Deve essere un valore booleano.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export default {
  id: 'academy',

  handler: (router, { database, logger }) => {
    router.get('/ping', (_req, res) => {
      res.json({
        status: 'ok',
        service: 'evocons-academy-enrollment',
        version: '1.2.0'
      });
    });

    router.post('/enrollment-request', async (req, res) => {
      // Protezione temporanea per i test locali.
      // La protezione pubblica effettiva è configurata in Nginx.
      if (![
        '127.0.0.1',
        '::1',
        '::ffff:127.0.0.1'
      ].includes(req.socket.remoteAddress)) {
        return res.status(403).json({
          success: false,
          code: 'DEVELOPMENT_ONLY'
        });
      }

      const result = validateEnrollment(req.body);

      if (!result.valid) {
        return res.status(400).json({
          success: false,
          code: 'VALIDATION_ERROR',
          errors: result.errors
        });
      }

      const body = req.body;

      const email = body.email.trim().toLowerCase();
      const firstName = body.first_name.trim();
      const lastName = body.last_name.trim();
      const phone = body.phone?.trim() || null;
      const marketingConsent = body.marketing_consent === true;

      try {
	const outcome = await withTransactionRetry(database, async trx => {
          const course = await trx('courses')
            .select('id')
            .where({
              slug: body.course_slug,
              status: 'published'
            })
            .first();

          if (!course) {
            return { courseNotAvailable: true };
          }

          const now = new Date();
          const candidateProspectId = randomUUID();

          // Il vincolo UNIQUE(email) gestisce anche
          // le richieste concorrenti.
          await trx('prospects')
            .insert({
              id: candidateProspectId,
              first_name: firstName,
              last_name: lastName,
              email,
              phone,
              source: 'academy-website',
              privacy_notice_version: NOTICE_VERSION,
              privacy_notice_accepted_at: now,
              marketing_consent: marketingConsent,
              marketing_consent_at: marketingConsent ? now : null,
              marketing_consent_version: marketingConsent
                ? NOTICE_VERSION
                : null,
              date_created: now
            })
            .onConflict('email')
            .ignore();

const prospect = await trx('prospects')
  .select('id')
  .where({ email })
  .forUpdate()
  .first();

          if (!prospect) {
            throw new Error('Prospect non recuperabile.');
          }

          // Un nuovo consenso esplicito può aggiornare
          // lo stato corrente. L'assenza di consenso
          // non costituisce una revoca.
          if (marketingConsent) {
            await trx('prospects')
              .where({ id: prospect.id })
              .update({
                marketing_consent: true,
                marketing_consent_at: now,
                marketing_consent_version: NOTICE_VERSION,
                date_updated: now
              });
          }

          const interestId = randomUUID();

          await trx('course_interests').insert({
            id: interestId,
            prospect_id: prospect.id,
            course_id: course.id,
            status: 'new',
            date_created: now
          });

          await trx('privacy_events').insert([
            {
              id: randomUUID(),
              prospect_id: prospect.id,
              course_interest_id: interestId,
              event_type: 'privacy_acknowledgement',
              event_value: true,
              notice_version: NOTICE_VERSION,
              occurred_at: now
            },
            {
              id: randomUUID(),
              prospect_id: prospect.id,
              course_interest_id: interestId,
              event_type: 'marketing_consent',
              event_value: marketingConsent,
              notice_version: NOTICE_VERSION,
              occurred_at: now
            }
          ]);

          return { courseNotAvailable: false };
        });

        if (outcome.courseNotAvailable) {
          return res.status(404).json({
            success: false,
            code: 'COURSE_NOT_AVAILABLE',
            message: 'Corso non disponibile.'
          });
        }

        return res.status(201).json({
          success: true,
          code: 'ENROLLMENT_REQUEST_CREATED',
          message: 'Richiesta registrata correttamente.'
        });

      } catch (error) {
        logger.error(error, 'Academy enrollment transaction failed');

        return res.status(500).json({
          success: false,
          code: 'INTERNAL_ERROR',
          message: 'Impossibile registrare la richiesta.'
        });
      }
    });
  }
};
