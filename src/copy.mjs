// Keep editorial punctuation separate from identifiers and route names.
export const plainCopy = text => text
  .replaceAll('Qu’est-ce que', 'Comment définir')
  .replaceAll('Puis-je', 'Peut on')
  .replaceAll('multi-entrepôts', 'sur plusieurs entrepôts')
  .replaceAll('multi-sociétés', 'avec plusieurs sociétés')
  .replaceAll('multi-société', 'avec plusieurs sociétés')
  .replaceAll('e-commerce', 'commerce en ligne')
  .replace(/([a-zéèêàù])\-t\-il\b/g, '$1')
  .replace(/([a-zéèêàù])\-(?:ils?|elles?)\b/g, '$1')
  .replace(/[—–_-]/g, ' ');
