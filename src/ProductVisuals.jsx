import React, { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ChartLineUp, Users, ChartBar, ArrowRight, FileText, Package, CreditCard } from '@phosphor-icons/react';

const screens = [
  { name: 'Pilotage', file: 'pilotage', icon: ChartLineUp, detail: 'Les chiffres et leur contexte, dans une même vue.' },
  { name: 'CRM', file: 'clients', icon: Users, detail: 'Les clients, leurs documents et les prochaines actions.' },
  { name: 'Analyses', file: 'analyses', icon: ChartBar, detail: 'Des ventes aux paiements, une lecture commune.' },
];

export function ProductStage() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [.94, 1]);
  return <div ref={ref} className="gx-product-theatre" id="produit"><motion.div className="gx-theatre-view" style={reduced ? undefined : { rotateX, scale }}><ScreenShowcase /></motion.div></div>;
}

export function ScreenShowcase({ single, compact = false }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const id = useId();
  const reduced = useReducedMotion();
  const selected = single ? { name: single === 'clients' ? 'Clients' : 'Gestelyo', file: single } : screens[active];
  const change = index => { setActive(index); setZoomed(false); };
  return <figure className={`gx-showcase gx-cropped ${compact ? 'gx-showcase-small' : ''} ${zoomed ? 'is-zoomed' : ''}`}>
    {!single && <div className="gx-module-tabs" role="tablist" aria-label="Explorer les écrans Gestelyo">{screens.map((screen, i) => <button type="button" key={screen.file} id={`${id}-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`${id}-screen`} tabIndex={active === i ? 0 : -1} onClick={() => change(i)} onKeyDown={event => {
      if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (active + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : 2)) % 3;
      change(next); document.getElementById(`${id}-tab-${next}`)?.focus();
    }}>{active === i && <motion.span className="gx-tab-marker" layoutId={`${id}-marker`} transition={{ duration: reduced ? 0 : .35, ease: [.22, 1, .36, 1] }}/>}<screen.icon size={21} weight={active === i ? 'fill' : 'regular'} /><span>{screen.name}</span></button>)}</div>}
    <div className="gx-product-frame"><div className="gx-screen-image" id={`${id}-screen`} role={single ? undefined : 'tabpanel'} aria-labelledby={single ? undefined : `${id}-tab-${active}`}>
      <AnimatePresence initial={false} mode="wait"><motion.img key={selected.file} initial={{ opacity: 0, x: reduced ? 0 : 35, clipPath: reduced ? 'inset(0)' : 'inset(0 0 0 8%)' }} animate={{ opacity: 1, x: 0, clipPath: 'inset(0)' }} exit={{ opacity: 0, x: reduced ? 0 : -18 }} transition={{ duration: reduced ? 0 : .38, ease: [.22, 1, .36, 1] }} src={`/product/${selected.file}.jpg`} width="1600" height="900" alt={`Écran de conception Gestelyo : ${selected.name.toLowerCase()}`} loading={compact ? 'lazy' : 'eager'} fetchPriority={compact ? 'auto' : 'high'} decoding="async" /></AnimatePresence>
    </div></div>
    <figcaption><span>Vos maquettes Gestelyo · données et entreprises fictives</span>{!single && <button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Vue complète' : 'Voir les détails'} <ArrowRight size={13}/></button>}</figcaption>
    {!single && <p className="gx-screen-detail" aria-live="polite">{selected.detail}</p>}
  </figure>;
}

const stages = [
  { name: 'Le client', icon: Users, title: 'Une relation, toute son histoire.', text: 'Le contact et ses documents restent liés. La proposition se prépare à partir du même dossier.', link: '/modules/crm/', cta: 'Explorer le CRM' },
  { name: 'La commande', icon: FileText, title: 'Du devis à la commande.', text: 'Une proposition acceptée devient une commande. L’équipe retrouve les articles, les quantités et le client.', link: '/modules/ventes-facturation/', cta: 'Voir les ventes' },
  { name: 'Le stock', icon: Package, title: 'Une disponibilité à comprendre.', text: 'La réservation prépare la livraison. Le stock disponible se distingue du stock physiquement présent.', link: '/modules/gestion-stock/', cta: 'Comprendre le stock' },
  { name: 'Le règlement', icon: CreditCard, title: 'La vente rejoint le suivi financier.', text: 'La facture et ses règlements complètent le parcours, avec un suivi des échéances envisagé.', link: '/modules/finance/', cta: 'Découvrir la finance' },
];
export function MotionJourney() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const id = useId();
  const selected = stages[active];
  return <div className="gx-flow"><div className="gx-flow-track" role="tablist" aria-label="Les étapes d’une vente">{stages.map((stage, i) => <button key={stage.name} id={`${id}-step-${i}`} type="button" role="tab" aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls={`${id}-detail`} className={active === i ? 'is-active' : ''} onClick={() => setActive(i)} onKeyDown={event => {if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return; event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 3 : (active + (event.key === 'ArrowRight' ? 1 : 3)) % 4; setActive(next); document.getElementById(`${id}-step-${next}`)?.focus();}}><stage.icon size={24}/><strong>{stage.name}</strong>{i < 3 && <ArrowRight size={17} className="gx-step-arrow"/>}</button>)}</div>
    <div className="gx-flow-progress" aria-hidden="true"><motion.span initial={false} animate={{ width: `${(active + 1) * 25}%` }} transition={{ duration: reduced ? 0 : .4 }}/></div>
    <div className="gx-flow-content" id={`${id}-detail`} role="tabpanel" aria-labelledby={`${id}-step-${active}`}><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}><h3>{selected.title}</h3><p>{selected.text}</p><a href={selected.link}>{selected.cta}<ArrowRight size={17}/></a></motion.div></AnimatePresence><a className="gx-flow-demo" href="/demo/">Essayez le parcours <ArrowRight size={20}/></a></div>
  </div>;
}
export function ProductStory() {
  return <section className="gx-story wrap" id="modules"><div className="gx-story-screen"><ScreenShowcase single="clients" compact /></div><div className="gx-story-copy"><h2>Vos équipes,<br/><em>dans le même mouvement.</em></h2><p>De la relation client au suivi des paiements, retrouvez le contexte utile pour faire avancer le travail.</p><a href="/modules/crm/">Découvrir le CRM <ArrowRight size={18}/></a><nav aria-label="Les modules Gestelyo">{[['Ventes et facturation', '/modules/ventes-facturation/'], ['Achats', '/modules/achats/'], ['Stock', '/modules/gestion-stock/'], ['Finance', '/modules/finance/']].map(([name, href]) => <a href={href} key={href}>{name}<ArrowRight size={16}/></a>)}</nav></div></section>;
}
