import React from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, GraduationCap, Menu, MonitorPlay, Sparkles, Users, X, Lightbulb, BriefcaseBusiness, Clock3, Code2, Workflow, Target, Laptop, MapPin, CheckCircle2, CalendarDays } from 'lucide-react';
import { isInnerPage, withUtm } from '../config/app';

function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="header-inner container">
        <a href={isInnerPage ? withUtm("/") : "#home"} className="brand" aria-label="Evocons Academy - homepage">
          <span className="brand-mark" aria-hidden="true">e</span><span className="brand-name">evocons</span><span className="brand-divider"/><span className="brand-academy">academy</span>
        </a>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Navigazione principale">
          <a href={isInnerPage ? withUtm("/#corsi") : "#corsi"} onClick={() => setOpen(false)}>Corsi</a>
          <a href={isInnerPage ? withUtm("/#perche-academy") : "#perche-academy"} onClick={() => setOpen(false)}>Perché Academy</a>
          <a href={isInnerPage ? withUtm("/#destinatari") : "#destinatari"} onClick={() => setOpen(false)}>A chi si rivolge</a>
          <a href={isInnerPage ? withUtm("/#metodo") : "#metodo"} onClick={() => setOpen(false)}>Come funziona</a>
        </nav>
        <a className="button button-primary header-cta" href={isInnerPage ? withUtm("/#corsi") : "#corsi"}>Scopri i percorsi <ArrowRight size={17}/></a>
        <button className="mobile-menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Chiudi menu' : 'Apri menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </header>
  );
}

export default Header;
