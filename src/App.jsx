import React from 'react';
import { ArrowRight, Package, Sparkle } from '@phosphor-icons/react';
import { SiteHeader, SiteFooter } from './SiteShell.jsx';
import DemoWorkspace from './DemoWorkspace.jsx';
import PricingSection from './PricingSection.jsx';
import { ProductStage, MotionJourney, ProductStory } from './ProductVisuals.jsx';

const editions = [
  ['Commerce & distribution', 'Priorité de lancement', 'Ventes, approvisionnements et disponibilités.', '/secteurs/commerce-distribution/', 'photo-1586528116311-ad8dd3c8310d'],
  ['Construction', 'Édition prévue', 'Relier les affaires et les coûts des chantiers.', '/secteurs/construction/', 'photo-1504307651254-35680f356dfd'],
  ['Retail & commerce en ligne', 'Édition prévue', 'Coordonner les canaux et le point de vente.', '/secteurs/retail-ecommerce/', 'photo-1441986300917-64674bd600d8'],
  ['Services & agences', 'Édition prévue', 'Suivre les missions et leur rentabilité.', '/secteurs/services-agences/', 'photo-1497366811353-6870744d04b2'],
  ['Fabrication', 'Édition prévue', 'Préparer les besoins de production.', '/secteurs/fabrication/', 'photo-1565043589221-1a6fd9ae45c7'],
];
const faq = [
  ['Comment définir Gestelyo ?', 'Gestelyo est un projet de progiciel de gestion intégré (ERP) pour les PME au Maroc. Son premier périmètre vise le commerce et la distribution : CRM, ventes, achats, stock et finance opérationnelle. Le site propose une démonstration locale, sans compte ERP réel.'],
  ['Que propose la démonstration ?', 'Vous pouvez changer la période du tableau de bord, filtrer les clients, ouvrir leurs documents et simuler une vente du devis au paiement. Les entreprises et montants sont fictifs ; aucune action n’est transmise à un serveur ERP.'],
  ['Quels sont les tarifs ?', 'Essentiel : 450 DH HT/mois ou 5 130 DH HT/an pour 3 utilisateurs. Business : 600 DH HT/mois ou 6 660 DH HT/an pour 5 utilisateurs. Premium : 900 DH HT/mois ou 9 720 DH HT/an pour 10 utilisateurs. Un utilisateur supplémentaire coûte 120 DH HT/mois ou 1 440 DH HT/an. La souscription sera disponible à l’ouverture du service.'],
  ['Le forfait dépend de mon secteur ?', 'Le forfait définit un niveau de fonctions et un nombre d’utilisateurs. L’édition décrit un métier. Commerce et distribution constituent la priorité de lancement ; les autres éditions restent prévues. Leurs modalités commerciales seront précisées avant disponibilité.'],
  ['L’IA peut exécuter un paiement ?', 'Le périmètre envisagé conserve une validation humaine obligatoire pour les paiements, les coordonnées bancaires et les opérations sensibles. Les modes, autorisations et quotas IA seront définis avant commercialisation.'],
  ['Une comptabilité complète est incluse ?', 'Le lancement vise la finance opérationnelle et les exports à destination du suivi comptable. La comptabilité native complète est une évolution ultérieure ; aucune conformité réglementaire spécifique n’est annoncée.'],
];

export default function App({ demoOnly = false }) {
  return <><SiteHeader path={demoOnly ? '/demo/' : '/'} /><main id="main" className={demoOnly ? 'gd-demo-page' : 'gh-home'}>
    {demoOnly ? <><section className="wrap gd-demo-intro"><div><h1>Prenez les commandes.</h1><p>Explorez les clients, puis faites avancer une vente. Tout se passe dans cet aperçu, avec des données fictives.</p></div><a href="/produit/">Comprendre le produit <ArrowRight size={17} /></a></section><div className="wrap" id="produit"><DemoWorkspace /></div></> : <>
      <section className="gx-hero"><div className="gx-hero-copy"><h1>Clients, ventes, stocks.<br /><em>Une gestion qui suit.</em></h1><div className="gx-hero-intro"><p>L’ERP pour les PME au Maroc. Reliez vos clients, vos ventes et vos stocks dans un espace commun.</p><div className="gh-actions"><a className="button primary" href="/demo/">Explorer la démo <ArrowRight size={19} /></a><a className="gx-discover" href="/produit/">Découvrir le produit <ArrowRight size={18}/></a></div></div></div><ProductStage /></section>
      <ProductStory />
      <section className="gx-journey wrap"><div className="gx-heading"><h2>Tout se suit.<br /><em>Rien ne se perd.</em></h2><p>La même information accompagne votre équipe, de la première proposition au dernier règlement.</p></div><MotionJourney /></section>
      <section className="gh-commerce"><div className="wrap gh-commerce-grid"><div><h2>Promettre une livraison.<br />Avec le bon stock.</h2><p>Une commande réserve des articles. Une livraison les fait sortir. Un règlement solde la facture. Trois événements différents, reliés à la même vente.</p><a className="button primary" href="/secteurs/commerce-distribution/">Voir les usages commerce <ArrowRight size={18} /></a></div><div className="gh-stock-example"><div><strong>Kit de fournitures</strong><small>Article ART 001 · Entrepôt Casablanca · données fictives</small></div><dl><div><dt>Physique</dt><dd>100<small>unités présentes</small></dd></div><div><dt>Réservé</dt><dd>10<small>pour une commande</small></dd></div><div><dt>Disponible</dt><dd>90<small>à la vente</small></dd></div></dl><p><Package size={18} />La réservation change la disponibilité, pas le stock physique.</p></div></div></section>
      <section className="gx-editions wrap" id="secteurs"><div><h2>Un socle commun.<br />Votre réalité métier.</h2><p>Commerce et distribution d’abord. Les autres éditions se construisent progressivement.</p></div><nav aria-label="Les éditions métier">{editions.map(([name, status, text, href], i) => <a key={href} href={href}><div><h3>{name}</h3><p>{text}</p></div><small>{status}</small><ArrowRight size={23}/></a>)}</nav></section>
      <section className="gh-ai wrap"><div className="gh-ai-copy"><h2>Préparer plus vite.<br />Garder la décision.</h2><p>Expliquer un indicateur, préparer une relance, proposer une prochaine action : l’IA envisagée part du contexte de gestion. Les opérations sensibles gardent une validation humaine.</p><a className="gh-text-link" href="/intelligence-artificielle/">Comprendre les modes et les limites <ArrowRight size={17} /></a></div><div className="gh-ai-example"><span><Sparkle size={18} />EXEMPLE D’ASSISTANCE · NON CONNECTÉ</span><blockquote>« Prépare une relance pour la facture FAC 032. »</blockquote><div><small>BROUILLON À RELIRE</small><p>Bonjour, merci de nous confirmer la date prévue de règlement de la facture FAC 032, d’un montant de 21 600 DH TTC. Merci.</p></div><p className="gh-ai-footnote">Le message est un exemple rédigé. Aucun envoi ni génération IA en direct.</p></div></section>
      <section className="gh-adoption wrap"><div><h2>Un nouvel outil.<br />Un départ organisé.</h2></div><div>{[['Reprendre vos données', 'Nettoyage, correspondances et contrôle des imports.', '/migration/'], ['Relier vos outils', 'Formats, responsabilités et connexions à définir.', '/integrations/'], ['Adapter vos parcours', 'Rôles, validations et personnalisation du travail.', '/personnalisation/'], ['Préparer le terrain', 'Mobile et point de vente dans la feuille de route.', '/mobile-pos/']].map(([title, text, href]) => <a key={href} href={href}><h3>{title}<ArrowRight size={18} /></h3><p>{text}</p></a>)}</div></section>
      <PricingSection />
      <section className="faq-section wrap" id="questions"><div><h2>Avant de<br />vous lancer.</h2></div><div className="faq-list">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section className="gh-closing wrap"><h2>Partons d’une vraie<br />journée de votre équipe.</h2><a className="button primary" href="/contact/">Préparer votre projet <ArrowRight size={19} /></a></section>
    </>}
  </main><SiteFooter /></>;
}
