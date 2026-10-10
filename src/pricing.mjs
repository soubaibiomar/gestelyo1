export const additionalUserMonthly = 120;

export const plans = [
  { id: "essentiel", name: "Essentiel", monthly: 450, annualDiscount: 5, users: 3, description: "Les bases pour structurer votre activité.", features: ["Clients, contacts et CRM de base", "Devis et factures", "Achats et stock de base", "Suivi des paiements", "Tableau de bord essentiel"] },
  { id: "business", name: "Business", monthly: 600, annualDiscount: 7.5, users: 5, description: "Pour les équipes qui grandissent.", features: ["Toutes les fonctions Essentiel", "Stock sur plusieurs entrepôts", "Gestion des rôles et permissions", "Suivi des projets", "Rapports et analyses avancés", "Workflows de gestion avancés"] },
  { id: "premium", name: "Premium", monthly: 900, annualDiscount: 10, users: 10, description: "Automatisez et pilotez toute votre activité.", features: ["Toutes les fonctions Business", "Automatisations avancées", "Intégrations étendues", "Tableaux de bord personnalisés", "Fonctionnalités IA avec quota défini", "Rapports financiers avancés"] },
].map((plan) => {
  const annual = Math.round(plan.monthly * 12 * (1 - plan.annualDiscount / 100));
  return { ...plan, annual, annualSaving: plan.monthly * 12 - annual };
});

export const serviceOptions = [
  ['Utilisateur supplémentaire', '120 DH', 'Par mois et par utilisateur'],
  ['Pack crédits IA', 'À partir de 99 DH', 'Par mois'],
  ['Migration Excel/CSV assistée', 'De 790 à 2 490 DH', 'Paiement unique'],
  ['Intégrations API avancées', 'À partir de 199 DH', 'Par mois + configuration'],
  ['Support prioritaire', 'De 199 à 399 DH', 'Par mois'],
  ['Formation personnalisée', 'À partir de 490 DH', 'Par session'],
  ['Infrastructure dédiée', 'Sur devis', 'Mensuelle + mise en place'],
  ['Développement spécifique', 'Sur devis', 'Par projet'],
];

export const priceLabel = (amount) => new Intl.NumberFormat("fr-MA", {
  maximumFractionDigits: 2,
}).format(amount);
