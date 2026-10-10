import React, { useEffect, useState } from "react";
import { SiteHeader, SiteFooter, ContactEmails } from "./SiteShell.jsx";
import PricingSection from "./PricingSection.jsx";
import { ScreenShowcase, MotionJourney } from "./ProductVisuals.jsx";
import { pageContent, articles } from "./content.mjs";

const labels = {
  "/produit/": "Découvrir le produit", "/modules/": "Explorer les modules", "/tarifs/": "Comparer les abonnements", "/demo/": "Explorer la démonstration", "/contact/": "Préparer votre besoin", "/ressources/": "Tous les guides", "/a-propos/": "Notre approche", "/securite/": "Sécurité & données", "/secteurs/services-agences/": "Services & agences", "/secteurs/commerce-distribution/": "Commerce & distribution", "/modules/gestion-stock/": "Gestion des stocks", "/modules/ventes-facturation/": "Ventes & facturation", "/ressources/marge-et-chiffre-affaires/": "Comprendre la marge", "/ressources/stock-disponible-reserve-physique/": "Comprendre les disponibilités",
};

function ContactBrief() {
  const [summary, setSummary] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return <section className="contact-brief" aria-labelledby="brief-title"><div><h2 id="brief-title">Commencez par votre quotidien.</h2><p>Ce formulaire prépare un résumé sur cet écran. Aucun envoi n’est effectué. Vous pouvez copier ce résumé dans votre message à l’équipe.</p><ContactEmails /></div>
    <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setSummary(`Mon activité : ${data.get("activity")}\nMon équipe : ${data.get("team")} utilisateurs\nMes outils et besoins : ${data.get("needs")}`); }}>
      <label>Votre activité<input name="activity" required maxLength={120} placeholder="Ex. agence de communication" /></label>
      <label>Nombre d’utilisateurs envisagé<input name="team" type="number" min="1" max="1000" required placeholder="5" /></label>
      <label>Vos outils actuels et les opérations à améliorer<textarea name="needs" required maxLength={1500} rows={5} placeholder="Ex. nous préparons nos devis dans un tableur…" /></label>
      <button className="button primary" disabled={!ready} type="submit">Préparer mon résumé</button>
      <noscript>Activez JavaScript pour préparer votre résumé. Vous pouvez consulter les guides sans l’activer.</noscript>
      {summary && <div className="brief-result"><p role="status">Votre résumé est prêt. Vous pouvez sélectionner le texte pour le conserver.</p><label>Résumé de votre besoin<textarea readOnly rows={6} value={summary} /></label></div>}
    </form>
  </section>;
}

function PricingFaq() {
  return <section className="page-faq wrap"><div><h2>Vos questions sur les abonnements.</h2></div><div className="faq-list">
    {[
      ["Quels sont les tarifs Gestelyo ?", "Essentiel : 450 DH HT/mois ou 5 130 DH HT/an pour 3 utilisateurs. Business : 600 DH HT/mois ou 6 660 DH HT/an pour 5 utilisateurs. Premium : 900 DH HT/mois ou 9 720 DH HT/an pour 10 utilisateurs. Le paiement annuel inclut une réduction de 5 % pour Essentiel, 7,5 % pour Business et 10 % pour Premium. Enterprise est proposé sur devis."],
      ["Comment fonctionne le paiement annuel ?", "Le montant annuel affiché est réglé en une fois pour douze mois d’accès. Les avantages annuels s’appliquent au forfait principal. Un utilisateur supplémentaire est facturé 1 440 DH HT pour douze mois."],
      ["Les taxes sont incluses ?", "Les montants sont affichés hors taxes. Les conditions de paiement, de renouvellement et de changement de forfait seront précisées avant souscription."],
      ["L’intelligence artificielle est illimitée ?", "Aucune utilisation illimitée n’est annoncée. Les fonctions, quotas et éventuels dépassements seront documentés avant commercialisation."],
      ["La souscription est déjà ouverte ?", "Gestelyo est actuellement présenté sous forme de prototype. La souscription sera proposée lorsque le service et ses conditions seront disponibles."],
    ].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
  </div></section>;
}

export default function ContentPage({ path }) {
  const page = pageContent[path];
  if (!page) return <><SiteHeader /><main id="main" className="page-hero wrap"><h1>Reprenons le bon chemin.</h1><p>Cette page n’existe pas.</p><a className="button primary" href="/">Retour à l’accueil</a></main><SiteFooter /></>;
  const isSector = ["services", "distribution", "sectors"].includes(page.layout);
  return <><SiteHeader path={path} /><main id="main" className={`content-page ${page.layout}-page`}>
    {page.layout === "pricing" ? <><PricingSection standalone /><PricingFaq /></> : <>
      <section className={`page-hero wrap ${isSector ? "sector-page-hero" : ""}`}>
        <div><nav className="breadcrumbs" aria-label="Fil d’Ariane"><a href="/">Accueil</a><span aria-hidden="true">/</span><span aria-current="page">{page.eyebrow.replace("GUIDE · ", "")}</span></nav>
          <h1>{page.heading}</h1><p>{page.intro}</p>
          {page.layout === "contact" && <ContactEmails />}
          {page.layout !== "article" && <div className="page-actions"><a className="button primary" href="/demo/">Explorer la démo</a><a href="/tarifs/">Voir les abonnements →</a></div>}
          {page.layout === "article" && <p className="article-byline">Rédaction Gestelyo · 9 octobre 2026 · Guide pratique</p>}
        </div>

      </section>
      {page.answer && <section className="answer-block wrap" aria-labelledby="direct-answer"><h2 id="direct-answer">{page.answer[0]}</h2><p>{page.answer[1]}</p></section>}
      {page.status && <div className="wrap"><p className="gh-page-status"><span className="gd-dot" />{page.status}</p></div>}
      {!["article", "resources", "contact", "about", "security"].includes(page.layout) && <div className="wrap gx-interior-visual"><ScreenShowcase single={path.includes('crm') ? 'clients' : path.includes('finance') ? 'analyses' : path === '/produit/' ? undefined : 'pilotage'} compact /></div>}
      {["product", "sales", "stock"].includes(page.layout) && <div className="wrap gx-interior-flow"><MotionJourney /></div>}
      {page.layout === "resources" ? <section className="resource-list wrap" aria-label="Guides pratiques">{articles.map((article, i) => <a className="resource-row" key={article.slug} href={`/ressources/${article.slug}/`}><span className="resource-category">{article.category}<small>GUIDE 0{i + 1}</small></span><div><h2>{article.name}</h2><p>{article.description}</p></div><span className="resource-arrow" aria-hidden="true">↗</span></a>)}</section> : <div className="editorial-layout wrap">
        <aside className="page-contents"><span>AU FIL DE CETTE PAGE</span><nav aria-label="Sommaire">{page.sections.map(([heading], i) => <a key={heading} href={`#section-${i + 1}`}>{heading}</a>)}</nav>{page.layout !== "article" && <p>Gestelyo est en développement. Le périmètre présenté décrit les usages envisagés.</p>}</aside>
        <div className="editorial-sections">{page.sections.map(([heading, text], i) => <section className="editorial-section" id={`section-${i + 1}`} key={heading}><div><h2>{heading}</h2><p>{text}</p>{page.sectionLinks?.[i] && <a className="text-link" href={page.sectionLinks[i]}>Explorer le périmètre →</a>}</div></section>)}</div>
      </div>}
      {path === '/produit/' && <section className="wrap gx-interior-visual"><h2 className="gx-guide-title">Un écran. Des actions à portée de main.</h2><ScreenShowcase single="parcours" compact /></section>}
      {page.example && <aside className="gh-page-example wrap"><h2>{page.example[0]}</h2><p>{page.example[1]}</p></aside>}
      {page.layout === "contact" && <div className="wrap"><ContactBrief /></div>}
      {page.question && <section className="answer-block wrap"><h2>{page.question[0]}</h2><p>{page.question[1]}</p></section>}
    </>}
    <section className="related-section wrap"><div><h2>{page.layout === "article" ? "Passez de la méthode au parcours." : "Regardez de plus près."}</h2></div><nav aria-label="Pour aller plus loin">{page.related.map(href => <a key={href} href={href}>{labels[href] || pageContent[href]?.heading} <span aria-hidden="true">↗</span></a>)}</nav></section>
  </main><SiteFooter /></>;
}
