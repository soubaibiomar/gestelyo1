// First party answers shared by the visible page and its structured metadata.
export const searchAnswers = {
  '/a-propos/': ['Quel est le site officiel de Gestelyo ?', 'Le site officiel de Gestelyo est gestelyo.com. Gestelyo est un projet de logiciel ERP destiné aux PME au Maroc, avec le commerce et la distribution comme premier périmètre. Les pages présentent les modules, les abonnements en dirhams et une démonstration avec des données fictives. Pour échanger avec l’équipe : omarsoubaibi@gestelyo.com ou redachouikh@gestelyo.com.'],
  '/produit/': ['Qu’est ce que Gestelyo ?', 'Gestelyo est un projet de logiciel ERP pour les PME au Maroc. Il réunit un périmètre CRM, devis, commandes, factures, achats, stocks et finance opérationnelle. La démonstration permet de tester un parcours de vente avec des données fictives. Elle ne remplace pas un service ERP en production.'],
  '/modules/crm/': ['À quoi sert le CRM Gestelyo ?', 'Le CRM Gestelyo organise le contexte commercial autour du client : coordonnées, documents et prochaines actions. Dans la démonstration locale, vous pouvez rechercher un client, consulter son dossier et retrouver ses documents. Les données présentées sont fictives.'],
  '/modules/ventes-facturation/': ['Comment suivre une vente du devis au paiement ?', 'Le parcours Gestelyo relie un devis à sa commande, puis à la livraison, à la facture et au règlement. Chaque étape conserve le client et les articles concernés. La démonstration permet de simuler ce parcours ; elle ne produit aucun document fiscal réel.'],
  '/modules/gestion-stock/': ['Quelle différence entre stock physique, réservé et disponible ?', 'Le stock physique correspond aux unités présentes. Le stock réservé correspond aux unités engagées pour une commande. Le stock disponible est le stock physique moins les réservations : avec 100 unités présentes et 10 réservées, 90 restent disponibles. Cet exemple décrit le parcours illustré dans la démonstration Gestelyo.'],
  '/modules/achats/': ['Quel est le rôle du module Achats ?', 'Le module Achats prévu pour Gestelyo relie fournisseurs, commandes et réceptions. Une commande fournisseur annonce un approvisionnement ; la réception constate les quantités reçues. Les règles de validation et les connexions avec des fournisseurs réels restent à définir avant commercialisation.'],
  '/modules/finance/': ['Gestelyo inclut il une comptabilité complète ?', 'Le périmètre Gestelyo vise la finance opérationnelle : factures, règlements, créances et dettes. Il ne constitue pas une comptabilité réglementaire complète. Les exports, les règles comptables et toute conformité spécifique doivent être validés avant souscription.'],
  '/intelligence-artificielle/': ['Que fait l’IA dans Gestelyo ?', 'Les usages IA envisagés pour Gestelyo sont la préparation de documents, la rédaction de relances et l’explication d’indicateurs. Le site montre des exemples rédigés, sans génération IA connectée. Les quotas, les accès et les validations humaines seront précisés avant commercialisation.'],
};

export const guideLinks = {
  '/modules/crm/': ['/modules/ventes-facturation/', '/contact/'],
  '/modules/ventes-facturation/': ['/ressources/suivre-les-factures-impayees/', '/modules/finance/'],
  '/modules/gestion-stock/': ['/ressources/stock-disponible-reserve-physique/', '/modules/achats/'],
};
