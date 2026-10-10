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

## Sécurité et publication

npm run test:security vérifie les protections HTTP sur un aperçu temporaire, les artefacts publics et les restrictions de la CI. Le lancer après npm run build. Les actions GitHub sont fixées à des commits, le jeton est en lecture seule, les identifiants ne sont pas conservés par checkout et le job expire après dix minutes. Dependabot propose chaque semaine les mises à jour npm et GitHub Actions.

public/_headers est copié vers dist/_headers. Ce format est pris en charge pour les ressources statiques par Cloudflare Pages et les hébergeurs compatibles. Sur un autre serveur, reporter ces valeurs dans sa configuration de réponses HTTP : copier ce fichier seul ne garantit aucune protection. Voir https://developers.cloudflare.com/pages/configuration/headers/ . Aucun hébergeur ni déploiement automatique n’est configuré ici.

La CSP autorise les scripts du site uniquement, bloque les objets intégrés, les cadres tiers et les soumissions natives de formulaires. Les styles intégrés restent autorisés pour React et les animations Motion. L’image Unsplash déjà utilisée est explicitement autorisée. Le formulaire actuel prépare uniquement un résumé local et les liens mailto restent utilisables. Revoir form-action avant de connecter un vrai formulaire. Référence : https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src .

HSTS est prévu pour le domaine HTTPS uniquement, sans includeSubDomains ni preload. L’aperçu HTTP local ne l’envoie pas. Avant activation publique, confirmer que HTTPS reste disponible ; après publication, vérifier les réponses réelles de l’accueil, /tarifs/, /modules/crm/ et d’une URL inexistante. La politique doit être envoyée par le serveur, y compris sur les erreurs. Vérifier les interactions et les erreurs CSP dans le navigateur. En cas de régression, restaurer la précédente politique serveur puis corriger la directive concernée.

Le dépôt ne permet pas de certifier MFA, droits des comptes, sauvegardes DNS, journaux, alertes ni protections CDN. Pour ce site statique sans API, paiement ou connexion réelle, il n’y a pas de traitement serveur à protéger par CAPTCHA ou quota applicatif. Au niveau hébergement, surveiller erreurs, trafic et coûts ; utiliser des limites adaptées et tester les faux positifs avant tout blocage. Préserver l’accès des visiteurs et robots de recherche légitimes, limiter la conservation des IP et prévoir la désactivation rapide d’une règle défectueuse. Réévaluer spam, rejeu, quotas et authentification avant ajout d’un backend.
