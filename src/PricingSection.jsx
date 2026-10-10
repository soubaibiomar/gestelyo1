import React, { useState } from "react";
import { Check } from '@phosphor-icons/react';
import { plans, serviceOptions, additionalUserMonthly, priceLabel } from "./pricing.mjs";

export default function PricingSection({ standalone = false }) {
  const [billing, setBilling] = useState("annual");
  const [selected, setSelected] = useState(null);
  return <section className="pricing-section wrap" id="tarifs" aria-labelledby="pricing-title">
    <div className="pricing-heading">
      <div>
        {standalone ? <h1 id="pricing-title">Une gestion commune.<br /><em>Un prix clair.</em></h1> : <h2 id="pricing-title">Votre prochain chapitre,<br />au bon rythme.</h2>}
        <p>Trois forfaits et une offre Enterprise sur devis.<br />Choisissez votre rythme de facturation.</p>
      </div>
      <div className="billing-switch" role="group" aria-label="Rythme de facturation">
        <button type="button" aria-pressed={billing === "monthly"} onClick={() => setBilling("monthly")}>Mensuel</button>
        <button type="button" aria-pressed={billing === "annual"} onClick={() => setBilling("annual")}>Annuel</button>
      </div>
    </div>
    <div className="pricing-grid">
      {plans.map((plan, i) => <article className={`pricing-card ${plan.id === "business" ? "featured" : ""}`} key={plan.id}>
        <div className="plan-identity"><div className="plan-heading">{standalone ? <h2>{plan.name}</h2> : <h3>{plan.name}</h3>}{plan.id === "business" && <span className="plan-badge">Pour votre équipe</span>}</div>
        <p className="plan-description">{plan.description}</p><div className="plan-users"><strong>{plan.users} utilisateurs inclus</strong></div></div><div className="plan-financial">
        <div className="plan-price" aria-live="polite" aria-atomic="true"><strong>{priceLabel(billing === "annual" ? plan.annual : plan.monthly)}</strong><span>DH HT / {billing === "annual" ? "an" : "mois"}</span></div>
        <p className="plan-equivalent">{billing === "annual" ? `Soit ${priceLabel(plan.annual / 12)} DH HT/mois. Paiement annuel en une fois.` : `Soit ${priceLabel(plan.monthly * 12)} DH HT sur 12 mensualités.`}</p>
        {billing === "annual" && <span className="plan-discount" aria-label={`Réduction annuelle de ${priceLabel(plan.annualDiscount)} %`}>{priceLabel(plan.annualDiscount)} % de réduction</span>}
        </div><ul className="plan-scope">{plan.features.map((text) => <li key={text}><Check size={15} aria-hidden="true" />{text}</li>)}</ul>
        <button className={`button ${plan.id === "business" ? "primary" : "secondary"}`} onClick={() => setSelected(plan)}>Découvrir {plan.name}</button>
      </article>)}
    </div>
    <article className="enterprise-offer"><div>{standalone ? <h2>Enterprise</h2> : <h3>Enterprise</h3>}<p>Une solution adaptée aux grandes exigences.</p><strong className="enterprise-price">Sur devis</strong><p>Contrat et facturation personnalisés · utilisateurs sur mesure</p></div><ul><li>Toutes les fonctions Premium</li><li>Infrastructure dédiée en option</li><li>Intégrations et développements spécifiques</li><li>SLA et support contractuels</li></ul><a className="button secondary" href="/contact/">Préparer mon devis →</a></article>
    {selected && <div className="plan-selection" role="status"><div><strong>{selected.name} · {selected.users} utilisateurs</strong><p>{priceLabel(billing === "annual" ? selected.annual : selected.monthly)} DH HT/{billing === "annual" ? "an" : "mois"}. La souscription sera disponible à l’ouverture du service.</p></div><a href="/demo/">Explorer la démo →</a><button onClick={() => setSelected(null)} aria-label="Fermer le détail du forfait">Fermer</button></div>}
    <div className="pricing-notes"><p><strong>Votre équipe s’agrandit ?</strong> Un utilisateur supplémentaire : {additionalUserMonthly} DH HT/mois, ou {priceLabel(additionalUserMonthly * 12)} DH HT/an.</p><p>Les avantages annuels s’appliquent au forfait principal, hors utilisateurs supplémentaires. Périmètre proposé pour le lancement ; disponibilité des fonctions et conditions de souscription à confirmer.</p></div>
    {standalone && <div className="comparison-block"><div><h2>Comparez vos abonnements.</h2></div><div className="comparison-scroll" role="region" aria-label="Comparatif des abonnements" tabIndex={0}><table className="comparison-table"><caption className="sr-only">Tarifs mensuels et annuels Gestelyo, hors taxes</caption><thead><tr><th scope="col">Votre abonnement</th>{plans.map(p => <th key={p.id} scope="col">{p.name}</th>)}</tr></thead><tbody>
      {[['Utilisateurs inclus', p => p.users], ['Paiement mensuel', p => `${priceLabel(p.monthly)} DH HT/mois`], ['Paiement annuel', p => `${priceLabel(p.annual)} DH HT/an`], ['Équivalent mensuel en annuel', p => `${priceLabel(p.annual / 12)} DH HT/mois`], ['Utilisateur supplémentaire', () => '120 DH HT/mois']].map(([label, value]) => <tr key={label}><th scope="row">{label}</th>{plans.map(p => <td key={p.id}>{value(p)}</td>)}</tr>)}
    </tbody></table></div></div>}
    {standalone ? <section className="pricing-options" aria-labelledby="options-title"><h2 id="options-title">Options et services supplémentaires</h2><p>Tarifs hors taxes. Le périmètre, la disponibilité et les modalités de chaque service seront précisés dans votre devis. Les fonctions IA et les intégrations restent soumises à leur disponibilité.</p><div className="comparison-scroll" role="region" aria-label="Options et services" tabIndex={0}><table className="comparison-table"><thead><tr><th scope="col">Option</th><th scope="col">Tarif HT</th><th scope="col">Facturation</th></tr></thead><tbody>{serviceOptions.map(([name, price, cadence]) => <tr key={name}><th scope="row">{name}</th><td>{price}</td><td>{cadence}</td></tr>)}</tbody></table></div><a className="text-link" href="/contact/">Définir les services adaptés à mon projet →</a></section> : <p className="pricing-options-link"><a className="text-link" href="/tarifs/#options-title">Voir les options et services supplémentaires →</a></p>}
  </section>;
}
