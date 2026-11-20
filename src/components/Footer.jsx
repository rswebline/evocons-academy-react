import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { isInnerPage, withUtm } from '../config/app';

function Footer() {
  return (
    <footer className="academy-footer" aria-label="Informazioni Evocons Academy">
      <div className="container footer-top">
        <div className="footer-intro">
          <a href={isInnerPage ? withUtm("/") : "#home"} className="brand footer-brand" aria-label="Evocons Academy - torna all’inizio">
            <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
          </a>
          <p>Competenze concrete per nuove opportunità. Formazione pratica, con persone vere e obiettivi reali.</p>
          <a className="footer-corporate" href="https://www.evocons.it/" target="_blank" rel="noopener noreferrer">Scopri Evocons <ArrowUpRight size={16}/></a>
        </div>
        <div className="footer-links">
          <h2>Esplora Academy</h2>
          <a href={isInnerPage ? withUtm("/#corsi") : "#corsi"}>I percorsi</a>
          <a href={isInnerPage ? withUtm("/#perche-academy") : "#perche-academy"}>Perché Academy</a>
          <a href={isInnerPage ? withUtm("/#destinatari") : "#destinatari"}>A chi si rivolge</a>
          <a href={isInnerPage ? withUtm("/#metodo") : "#metodo"}>Come funziona</a>
        </div>
        <div className="footer-links">
          <h2>La formazione</h2>
          <p><MonitorPlay size={17}/> Online in diretta</p>
          <p><Users size={17}/> Interazione con il docente</p>
          <p><GraduationCap size={17}/> Corsi Base, Professional e Master</p>
        </div>
        <div className="footer-contact">
          <h2>Costruiamo il tuo prossimo passo.</h2>
          <p>Scopri il percorso più adatto ai tuoi obiettivi.</p>
          <a href={isInnerPage ? withUtm("/#corsi") : "#corsi"} className="button footer-button">Esplora i corsi <ArrowRight size={18}/></a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Evocons Academy · Un progetto Evocons</span>
        <a href={withUtm('/privacy')}>Privacy</a>
        <a href={withUtm('https://www.evocons.it/contatti')} target="_blank" rel="noopener noreferrer">Contatti <ArrowUpRight size={14}/></a>
      </div>
    </footer>
  );
}

export default Footer;
