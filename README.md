# Gestelyo

Site React et Vite en français : 31 pages prérendues, présentation du produit, abonnements et démonstration locale.

## Commandes

Installer : npm ci

Développer : npm run dev

Construire : npm run build

Vérifier : npm run test:seo et npm run test:demo

Ouvrir un aperçu : npm run preview -- --port 4174 --strictPort

Contrôler les réponses HTTP : node scripts/verify-preview.mjs

## Domaine et indexation

Le domaine officiel https://gestelyo.com est défini dans site.config.mjs. La construction génère canonical, métadonnées sociales, données structurées, robots.txt et sitemap.xml. SITE_URL permet une surcharge HTTPS explicite.

Pour un aperçu non indexable, définir SITE_MODE=preview dans l’environnement avant la construction et les tests. Retirer cette variable pour une construction publique. Les variables sont lues dans le processus, pas automatiquement dans un fichier .env.

## Hébergement

Publier dist/ à la racine du domaine. Servir les index.html des sous dossiers. Les chemins inconnus doivent renvoyer 404.html avec un statut HTTP 404. Ne pas appliquer de réécriture SPA universelle. Rediriger HTTP et les hôtes secondaires vers https://gestelyo.com en conservant le chemin.

Le dépôt ne déploie pas automatiquement le site. DNS, certificat HTTPS et rattachement du domaine se configurent chez l’hébergeur. GitHub Actions construit et vérifie le site à chaque envoi.

## SEO et visibilité IA

Les contenus sont lisibles sans JavaScript. Les tests couvrent les 31 routes, titres, descriptions, liens, H1, tarifs, données structurées et réponses produit. La politique robots existante est conservée. Après publication, vérifier le domaine dans Search Console et Bing Webmaster Tools, soumettre le sitemap et inspecter les pages prioritaires.

Les vérifications locales ne prouvent pas une indexation, un classement, une citation IA ou les performances terrain.

## Contact

omarsoubaibi@gestelyo.com

redachouikh@gestelyo.com

## Périmètre

Les entreprises et montants de la démonstration sont fictifs. Aucun serveur ERP, compte réel, abonnement ni paiement réel n’est fourni. Le formulaire Contact prépare un résumé local. Les liens courriel ouvrent la messagerie du visiteur.

Les captures et logos fournis sont dans public/. Les polices sont locales. Les rapports et captures de revue restent des artefacts locaux.
