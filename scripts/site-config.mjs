import { canonicalOrigin } from '../site.config.mjs';

export function publicationOrigin() {
  return process.env.SITE_MODE === 'preview' ? null : siteOrigin(process.env.SITE_URL || canonicalOrigin);
}

export function siteOrigin(raw) {
  if (!raw) return null;
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/" ||
    !url.hostname.includes(".") ||
    /(^localhost$|\.localhost$|\.local$|^127\.|^0\.|^10\.|^192\.168\.|^172\.(1[6-9]|2\d|3[01])\.|^\[)/i.test(
      url.hostname,
    )
  ) {
    throw new Error(
      "SITE_URL doit être une origine HTTPS publique, sans chemin, identifiant, query ou fragment.",
    );
  }
  return url.origin;
}

export function structuredData(origin, path = "/", meta = {}) {
  const app = {
    "@type": "SoftwareApplication",
    name: "Gestelyo",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "fr",
    description:
      "Projet d’ERP pour les PME au Maroc, avec commerce et distribution en priorité : CRM, ventes, achats, stocks et finance opérationnelle. Prototype interactif avec données fictives ; souscription non disponible.",
    featureList: [
      "CRM",
      "Ventes",
      "Achats",
      "Stock",
      "Finance opérationnelle (périmètre prévu)",
    ],
  };
  const page = {
    "@type": path === '/contact/' ? 'ContactPage' : path === '/a-propos/' ? 'AboutPage' : 'WebPage',
    name: meta.title || "Gestelyo | Logiciel de gestion pour PME au Maroc",
    inLanguage: "fr",
    description: meta.description || app.description,
    about: app,
  };
  const publisher = {
    '@type': 'Organization', name: 'Gestelyo',
    description: 'Gestelyo développe un projet de logiciel ERP pour les PME au Maroc, avec le commerce et la distribution comme priorité de lancement.',
    email: ['omarsoubaibi@gestelyo.com', 'redachouikh@gestelyo.com'],
    ...(origin ? { '@id': `${origin}/#organization`, url: `${origin}/`, logo: `${origin}/gestelyo-logo.png` } : {}),
  };
  const extras = [publisher];
  if (origin && path !== '/' && meta.eyebrow && meta.layout !== 'pricing') {
    extras.push({ '@type': 'BreadcrumbList', '@id': `${origin}${path}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: meta.eyebrow?.replace('GUIDE · ', '') || meta.title, item: `${origin}${path}` },
    ] });
    page.breadcrumb = { '@id': `${origin}${path}#breadcrumb` };
  }
  if (meta.layout === 'article') {
    const article = { '@type': 'Article', headline: meta.heading, description: meta.description, inLanguage: 'fr', datePublished: '2026-10-09', author: { '@type': 'Organization', name: 'Rédaction Gestelyo' }, publisher };
    if (origin) { article['@id'] = `${origin}${path}#article`; article.mainEntityOfPage = { '@id': `${origin}${path}#webpage` }; page.mainEntity = { '@id': article['@id'] }; }
    extras.push(article);
  }
  if (meta.answer) page.abstract = meta.answer[1];
  if (origin) {
    app["@id"] = `${origin}/#software`;
    app.url = `${origin}/`;
    app.publisher = { '@id': `${origin}/#organization` };
    page.publisher = { '@id': `${origin}/#organization` };
    page["@id"] = `${origin}${path}#webpage`;
    page.url = `${origin}${path}`;
    page.isPartOf = { "@id": `${origin}/#website` };
  }
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Gestelyo",
        alternateName: "Gestelyo ERP",
        inLanguage: "fr",
        publisher: origin ? { '@id': `${origin}/#organization` } : publisher,
        ...(origin ? { "@id": `${origin}/#website`, url: `${origin}/` } : {}),
      },
      page,
      ...extras,
    ],
  };
}
