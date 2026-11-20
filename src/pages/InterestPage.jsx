import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { API_BASE_URL, ENROLLMENT_ENABLED, PRIVACY_URL, PRIVACY_VERSION, withUtm, getUtmParameters } from '../config/app';
import { fetchEditions, formatEditionDate, formatEditionTime } from '../services/editions';

function InterestPage() {
  const slug = new URLSearchParams(window.location.search).get('corso');
  const editionId = new URLSearchParams(window.location.search).get('edizione');
  const [selectedEdition, setSelectedEdition] = React.useState(null);
  const [editionStatus, setEditionStatus] = React.useState(editionId ? 'loading' : 'generic');
  const [course, setCourse] = React.useState(null);
  const [courseStatus, setCourseStatus] = React.useState('loading');
  React.useEffect(() => {
    const controller = new AbortController();
    async function loadCourse() {
      try {
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error('Slug non valido');
        const response = await fetch(`${API_BASE_URL}/academy/courses/${encodeURIComponent(slug)}/details`, { signal: controller.signal });
        if (!response.ok) throw new Error('Corso non disponibile');
        const payload = await response.json();
        if (!payload.data || payload.data.slug !== slug) throw new Error('Dettaglio corso non valido');
        setCourse(payload.data);
        setCourseStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setCourseStatus('error');
      }
    }
    loadCourse();
    return () => controller.abort();
  }, [slug]);
  React.useEffect(() => {
    if (!editionId) return;
    const controller = new AbortController();
    if (!slug || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(editionId)) {
      setEditionStatus('error');
      return;
    }
    fetchEditions(slug, controller.signal)
      .then(editions => {
        if (controller.signal.aborted) return;
        const match = editions.find(item => item.id === editionId);
        setSelectedEdition(match || null);
        setEditionStatus(match ? 'ready' : 'error');
      })
      .catch(error => {
        if (controller.signal.aborted) return;
        console.warn('Impossibile verificare l’edizione.', error);
        setEditionStatus('error');
      });
    return () => controller.abort();
  }, [slug, editionId]);
  const [values, setValues] = React.useState({ first_name: '', last_name: '', email: '', phone: '', acknowledged: false, marketing: false });
  const [status, setStatus] = React.useState('idle');
  const [error, setError] = React.useState('');
  const ready = ENROLLMENT_ENABLED && Boolean(PRIVACY_URL && PRIVACY_VERSION) && courseStatus === 'ready' && (editionStatus === 'generic' || editionStatus === 'ready');

  React.useEffect(() => {
    document.title = 'Manifestazione d’interesse | Evocons Academy';
  }, []);

  function update(field, value) {
    setValues(previous => ({ ...previous, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    if (!course || !ready || status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/academy/enrollment-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: values.first_name.trim(),
          last_name: values.last_name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          course_slug: course.slug,
          ...(selectedEdition ? { edition_id: selectedEdition.id } : {}),
          privacy_notice_version: PRIVACY_VERSION,
          privacy_notice_acknowledged: values.acknowledged,
          marketing_consent: values.marketing,
          ...getUtmParameters()
        })
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        if (payload?.code === 'EDITION_NOT_AVAILABLE') {
          throw new Error('L’edizione selezionata non è più disponibile. Torna al calendario e scegli un’altra data.');
        }
        throw new Error('Non è stato possibile inviare la richiesta. Riprova più tardi.');
      }
      setStatus('success');
    } catch (error) {
      setError(error.message || 'Non è stato possibile inviare la richiesta. Riprova più tardi.');
      setStatus('error');
    }
  }

  return <main className="interest-page" id="home">
    <section className="interest-intro">
      <div className="container">
        <a
          className="course-back"
          href={withUtm(course ? `/corsi/${encodeURIComponent(course.slug)}/` : '/#corsi')}
        >
          ← Torna ai corsi
        </a>
        <p className="eyebrow">EVOCONS ACADEMY · FORMAZIONE</p>
        <h1>Il prossimo passo <span>inizia qui.</span></h1>
        <p>Scopri il percorso più adatto a te. Lasciaci i tuoi riferimenti: ti contatteremo per condividere programma, modalità di partecipazione e prossime date.</p>
      </div>
    </section>
    <section className="interest-section">
      <div className="container interest-grid">
        <aside className="interest-aside">
          <p className="eyebrow">IL PERCORSO CHE TI INTERESSA</p>
          <h2>{course ? course.title : 'Percorso non disponibile'}</h2>
          <p>{course ? (course.hero_description || course.description || 'Scopri questo percorso formativo.') : (courseStatus === 'loading' ? 'Caricamento del percorso…' : 'Il collegamento non identifica un corso disponibile. Torna al catalogo e scegli un percorso.')}</p>
          {course && <div className="interest-facts"><span><Clock3 size={18}/> {Number(course.duration_hours) > 0 ? `${Number(course.duration_hours).toLocaleString("it-IT")} ore` : "Durata da definire"}</span><span><MonitorPlay size={18}/> {course.delivery_mode === "online_live" ? "Online in diretta" : "Modalità da confermare"}</span></div>}
          {editionId && editionStatus === 'loading' && <p className="interest-edition" role="status">Verifica dell’edizione selezionata…</p>}
          {editionId && editionStatus === 'error' && <p className="interest-edition-error" role="alert">L’edizione indicata non è disponibile. Torna al calendario del corso per selezionarne un’altra.</p>}
          {selectedEdition && editionStatus === 'ready' && <div className="interest-edition">
            <strong>Edizione selezionata</strong>
            <span>{formatEditionDate(selectedEdition.start_date)}{selectedEdition.end_date ? ` – ${formatEditionDate(selectedEdition.end_date)}` : ''}</span>
            {selectedEdition.calendar_name && <span>{selectedEdition.calendar_name}{selectedEdition.start_time && selectedEdition.end_time ? ` · ${formatEditionTime(selectedEdition.start_time)}–${formatEditionTime(selectedEdition.end_time)}` : ''}</span>}
            <span>{selectedEdition.status === 'confirmed' ? 'Partenza confermata' : 'Programmata · soggetta a conferma'}</span>
            <a href={withUtm(`/corsi/${encodeURIComponent(slug)}/#calendario`)}>Cambia edizione</a>
          </div>}
          <a
            href={withUtm(course ? `/corsi/${encodeURIComponent(course.slug)}/` : '/#corsi')}
            className="course-text-link"
          >
            Consulta il programma <ArrowRight size={17}/>
          </a>
        </aside>
        <div className="interest-panel">
          {status === 'success' ? <div className="interest-success" role="status"><CheckCircle2 size={38}/><h2>Richiesta ricevuta</h2><p>Grazie per l'interesse. Ti contatteremo per fornirti maggiori informazioni.</p><a href={withUtm('/')} className="button button-primary">Torna ad Academy <ArrowRight size={17}/></a></div> : <>
            <h2>Parliamo del tuo percorso.</h2>
            {selectedEdition && editionStatus === 'ready' && <p className="interest-panel-lead"><strong>Edizione del {formatEditionDate(selectedEdition.start_date)}</strong> · La richiesta sarà associata a questa edizione.</p>}
            {import.meta.env.MODE === 'test' && <p className="interest-notice" role="status">AMBIENTE DI TEST · Verifica la destinazione API prima di utilizzare dati reali.</p>}
            <p className="interest-panel-lead">Lascia i tuoi riferimenti per ricevere informazioni. I campi contrassegnati con * sono obbligatori.</p>
            <form onSubmit={submit} className="interest-form">
              <div className="interest-form-row">
                <label>Nome *<input required maxLength={100} autoComplete="given-name" value={values.first_name} onChange={e => update('first_name', e.target.value)} /></label>
                <label>Cognome *<input required maxLength={100} autoComplete="family-name" value={values.last_name} onChange={e => update('last_name', e.target.value)} /></label>
              </div>
              <label>Email *<input required type="email" maxLength={254} autoComplete="email" value={values.email} onChange={e => update('email', e.target.value)} /></label>
              <label>Telefono <span className="interest-optional">(facoltativo)</span><input type="tel" maxLength={30} autoComplete="tel" value={values.phone} onChange={e => update('phone', e.target.value)} /></label>
              <div className="interest-consents">
                <label className="interest-check"><input type="checkbox" required checked={values.acknowledged} onChange={e => update('acknowledged', e.target.checked)} /><span>Confermo di aver preso visione dell’<a href={PRIVACY_URL || undefined} onClick={e => { if (!PRIVACY_URL) e.preventDefault(); }} target="_blank" rel="noopener noreferrer">informativa sul trattamento dei dati personali</a>. *</span></label>
                <label className="interest-check"><input type="checkbox" checked={values.marketing} onChange={e => update('marketing', e.target.checked)} /><span>Acconsento a ricevere comunicazioni promozionali relative alle iniziative formative di Evocons Academy. (Facoltativo)</span></label>
              </div>
              {editionId && editionStatus === 'error' && <p className="interest-error" role="alert">Invio disabilitato: edizione non disponibile.</p>}
              {!ENROLLMENT_ENABLED || !PRIVACY_URL || !PRIVACY_VERSION ? <p className="interest-notice" role="status">Modulo in preparazione.</p> : null}
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="button button-primary interest-submit" disabled={!ready || !course || status === 'sending'}>{status === 'sending' ? 'Invio in corso…' : 'Invia manifestazione d’interesse'} <ArrowRight size={17}/></button>
            </form>
          </>}
        </div>
      </div>
    </section>
  </main>;
}

export default InterestPage;
