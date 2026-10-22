
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

const UPLOADS_DIR = '/opt/directus/uploads';

export default {
  id: 'academy-catalog',

  handler: (router, { database }) => {

    // Catalogo pubblico dei corsi
    router.get('/courses', async (req, res) => {
      try {
        const courses = await database('courses')
          .select(
            'id',
            'title',
            'slug',
            'description',
            'category',
            'duration_hours',
            'delivery_mode',
            'image',
            'sort_order'
          )
          .where('status', 'published')
          .orderBy('sort_order', 'asc')
          .orderBy('title', 'asc');

        res.set('Cache-Control', 'no-store');
        return res.json({ data: courses });

      } catch (error) {
        console.error(
          '[academy-catalog] Error retrieving courses',
          error
        );

        return res.status(500).json({
          error: 'Unable to retrieve course catalog'
        });
      }
    });

    // Dettaglio editoriale di un corso pubblicato
    router.get('/courses/:slug/details', async (req, res) => {
      try {
        const course = await database('courses')
          .select(
            'id',
            'title',
            'slug',
            'description',
            'category',
            'duration_hours',
            'delivery_mode',
            'image',
            'hero_title',
            'hero_description',
            'hero_image',
            'overview_title',
            'overview_text',
            'overview_image',
            'outcomes_title',
            'outcomes_text',
            'outcomes_image'
          )
          .where({
            slug: req.params.slug,
            status: 'published'
          })
          .first();

        if (!course) {
          return res.sendStatus(404);
        }

        const outcomes = await database('course_outcomes')
          .select(
            'id',
            'title',
            'description',
            'sort'
          )
          .where('course', course.id)
          .orderBy('sort', 'asc')
          .orderBy('id', 'asc');

        res.set('Cache-Control', 'no-store');

        return res.json({
          data: {
            ...course,
            outcomes
          }
        });

      } catch (error) {
        console.error(
          '[academy-catalog] Error retrieving course details',
          error
        );

        return res.status(500).json({
          error: 'Unable to retrieve course details'
        });
      }
    });

    // Moduli didattici di un corso pubblicato
    router.get('/courses/:slug/modules', async (req, res) => {
      try {
        const course = await database('courses')
          .select('id')
          .where({
            slug: req.params.slug,
            status: 'published'
          })
          .first();

        if (!course) {
          return res.sendStatus(404);
        }

        const modules = await database('course_modules')
          .select(
            'id',
            'title',
            'description',
            'duration_hours',
            'practice',
            'image',
            'sort'
          )
          .where('course', course.id)
          .orderBy('sort', 'asc');

        res.set('Cache-Control', 'no-store');
        return res.json({ data: modules });

      } catch (error) {
        console.error(
          '[academy-catalog] Error retrieving modules',
          error
        );

        return res.status(500).json({
          error: 'Unable to retrieve course modules'
        });
      }
    });

router.get('/courses/:slug/modules/:moduleId/image', async (req, res) => {
  try {
    const module = await database('course_modules as m')
      .join('courses as c', 'c.id', 'm.course')
      .select('m.image')
      .where('c.slug', req.params.slug)
      .where('c.status', 'published')
      .where('m.id', req.params.moduleId)
      .first();

    if (!module?.image) return res.sendStatus(404);

    const file = await database('directus_files')
      .select('filename_disk', 'type')
      .where('id', module.image)
      .first();

    if (!file || file.type !== 'image/avif') return res.sendStatus(404);

    if (!/^[a-zA-Z0-9_-]+\.avif$/.test(file.filename_disk)) {
      return res.sendStatus(404);
    }

    const filePath = join(UPLOADS_DIR, file.filename_disk);
    const fileInfo = await stat(filePath);

    if (!fileInfo.isFile()) return res.sendStatus(404);

    res.set({
      'Content-Type': 'image/avif',
      'Content-Length': String(fileInfo.size),
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    });

    await pipeline(createReadStream(filePath), res);
  } catch (error) {
    console.error('[academy-catalog] Error retrieving module image', error);
    if (!res.headersSent) return res.sendStatus(500);
  }
});

    // Immagine della card di un corso pubblicato
    router.get('/courses/:slug/:imageType(image|hero-image|overview-image|outcomes-image)', async (req, res) => {
      try {
const imageFields = {
  image: 'image',
  'hero-image': 'hero_image',
  'overview-image': 'overview_image',
  'outcomes-image': 'outcomes_image'
};

const imageField = imageFields[req.params.imageType];
        const course = await database('courses')
          .select(imageField)
          .where({
            slug: req.params.slug,
            status: 'published'
          })
          .first();

        if (!course?.[imageField]) {
          return res.sendStatus(404);
        }

        const file = await database('directus_files')
          .select('filename_disk', 'type')
          .where('id', course[imageField])
          .first();

        if (!file || file.type !== 'image/avif') {
          return res.sendStatus(404);
        }

        // filename_disk deve essere un nome, non un percorso.
        if (!/^[a-zA-Z0-9_-]+\.avif$/.test(file.filename_disk)) {
          return res.sendStatus(404);
        }

        const filePath = join(UPLOADS_DIR, file.filename_disk);
        const fileInfo = await stat(filePath);

        if (!fileInfo.isFile()) {
          return res.sendStatus(404);
        }

        res.set({
          'Content-Type': 'image/avif',
          'Content-Length': String(fileInfo.size),
          'Cache-Control': 'public, max-age=3600',
          'X-Content-Type-Options': 'nosniff'
        });

        await pipeline(createReadStream(filePath), res);

      } catch (error) {
        console.error(
          '[academy-catalog] Error retrieving image',
          error
        );

        if (!res.headersSent) {
          return res.sendStatus(500);
        }
      }
    });
  }
};
