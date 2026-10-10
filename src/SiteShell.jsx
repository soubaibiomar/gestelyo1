import React, { useState } from "react";
import { List, X, ArrowRight, CaretDown } from "@phosphor-icons/react";

const navigation = [
  ['/produit/', 'Produit', [['/produit/', 'Vue d’ensemble'], ['/intelligence-artificielle/', 'Intelligence artificielle'], ['/integrations/', 'Intégrations'], ['/migration/', 'Reprise des données'], ['/personnalisation/', 'Personnalisation'], ['/mobile-pos/', 'Mobile et point de vente']]],
  ['/modules/', 'Modules', [['/modules/', 'Tous les modules'], ['/modules/crm/', 'CRM'], ['/modules/ventes-facturation/', 'Ventes et facturation'], ['/modules/achats/', 'Achats'], ['/modules/gestion-stock/', 'Stock'], ['/modules/finance/', 'Finance']]],
  ['/secteurs/', 'Secteurs', [['/secteurs/', 'Les éditions métier'], ['/secteurs/commerce-distribution/', 'Commerce et distribution'], ['/secteurs/construction/', 'Construction'], ['/secteurs/retail-ecommerce/', 'Retail et e commerce'], ['/secteurs/services-agences/', 'Services et agences'], ['/secteurs/fabrication/', 'Fabrication']]],
  ['/tarifs/', 'Tarifs', []],
  ['/ressources/', 'Ressources', [['/ressources/', 'Guides pratiques'], ['/a-propos/', 'À propos'], ['/securite/', 'Sécurité et données'], ['/contact/', 'Préparer un échange']]],
];

export function Logo() {
  return <span className="brand"><img src="/gestelyo-logo.png" alt="Gestelyo" width="192" height="96" /></span>;
}

export function ContactEmails() {
  return <address className="contact-emails" aria-label="Adresses de contact Gestelyo">{['omarsoubaibi@gestelyo.com', 'redachouikh@gestelyo.com'].map(email => <a key={email} href={`mailto:${email}`}>{email}</a>)}</address>;
}

export function SiteHeader({ path = "/" }) {
  const [expanded, setExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  return <>
    <a className="skip-link" href="#main">Aller au contenu</a>
    <header className="site-header wrap">
      <a href="/" aria-label="Gestelyo, accueil"><Logo /></a>
      <nav className={`main-nav ${expanded ? "open" : ""}`} aria-label="Navigation principale">
        {navigation.map(([href, text, children]) => <div className="gh-nav-group" key={href} onKeyDown={event => { if (event.key === 'Escape') { setActiveMenu(null); event.currentTarget.querySelector('button')?.focus(); } }}>
          <a href={href} aria-current={path === href ? 'page' : undefined}>{text}</a>
          {children.length > 0 && <><button aria-label={`Afficher les pages ${text}`} aria-expanded={activeMenu === href} aria-controls={`nav-${text}`} onClick={() => setActiveMenu(activeMenu === href ? null : href)}><CaretDown size={12} /></button><div className="gh-nav-panel" id={`nav-${text}`} hidden={activeMenu !== href}><span>{text}</span>{children.map(([url, label]) => <a href={url} key={url} aria-current={path === url ? 'page' : undefined}>{label}<ArrowRight size={13} /></a>)}</div></>}
        </div>)}
      </nav>
      <div className="header-actions"><span className="language">FR</span><a className="login" href="/contact/">Parlons de votre activité</a><a className="button primary small" href="/demo/">Explorer la démo <ArrowRight size={16} /></a></div>
      <button className="menu-toggle" aria-label={expanded ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <X /> : <List />}</button>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer-new wrap">
    <div className="footer-brand"><a href="/" aria-label="Gestelyo, accueil"><Logo /></a><p>Votre activité,<br />une vision commune.</p><small>© 2026 Gestelyo</small></div>
    <div><strong>La plateforme</strong><a href="/produit/">Le produit</a><a href="/modules/">Les modules</a><a href="/intelligence-artificielle/">Intelligence artificielle</a><a href="/tarifs/">Les abonnements</a><a href="/demo/">La démonstration</a></div>
    <div><strong>Votre activité</strong><a href="/secteurs/commerce-distribution/">Commerce & distribution</a><a href="/secteurs/">Les éditions prévues</a><a href="/migration/">Reprise des données</a><a href="/integrations/">Intégrations</a><a href="/ressources/">Guides pratiques</a></div>
    <div><strong>Gestelyo</strong><a href="/a-propos/">À propos</a><a href="/securite/">Sécurité & données</a><a href="/contact/">Préparer un échange</a><ContactEmails /></div>
  </footer>;
}
