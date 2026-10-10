export const money = value => new Intl.NumberFormat('fr-MA', { maximumFractionDigits: 2 }).format(value);
export const clients = [
  { id: 'CL 001', name: 'Atlas Distribution', initials: 'AD', city: 'Casablanca', owner: 'Nadia', status: 'Actif' },
  { id: 'CL 002', name: 'Rive Commerce', initials: 'RC', city: 'Rabat', owner: 'Youssef', status: 'Actif' },
  { id: 'CL 003', name: 'Comptoir du Sud', initials: 'CS', city: 'Marrakech', owner: 'Nadia', status: 'Actif' },
  { id: 'CL 004', name: 'Nord Équipement', initials: 'NE', city: 'Tanger', owner: 'Youssef', status: 'Prospect' },
  { id: 'CL 005', name: 'Maison de l’Article', initials: 'MA', city: 'Rabat', owner: 'Nadia', status: 'Actif' },
  { id: 'CL 006', name: 'Cap Fournitures', initials: 'CF', city: 'Casablanca', owner: 'Youssef', status: 'En pause' },
];
// Jeu pédagogique unique : les indicateurs et les séries se déduisent des documents.
export const invoices = [
  { id: 'FAC 026', client: 'CL 001', month: '2026-06', ht: 32000, paid: 38400 },
  { id: 'FAC 027', client: 'CL 002', month: '2026-07', ht: 46000, paid: 55200 },
  { id: 'FAC 028', client: 'CL 003', month: '2026-08', ht: 38000, paid: 45600 },
  { id: 'FAC 029', client: 'CL 001', month: '2026-09', ht: 45000, paid: 54000 },
  { id: 'FAC 030', client: 'CL 002', month: '2026-09', ht: 15000, paid: 12000 },
  { id: 'FAC 031', client: 'CL 001', month: '2026-10', ht: 52000, paid: 62400 },
  { id: 'FAC 032', client: 'CL 003', month: '2026-10', ht: 18000, paid: 0 },
  { id: 'FAC 033', client: 'CL 005', month: '2026-10', ht: 12000, paid: 9600 },
];
export const purchases = [
  { month: '2026-06', ht: 20000, paid: 24000 },
  { month: '2026-07', ht: 28000, paid: 33600 },
  { month: '2026-08', ht: 24000, paid: 28800 },
  { month: '2026-09', ht: 35000, paid: 36000 },
  { month: '2026-10', ht: 48000, paid: 48000 },
];
export const months = [['2026-06', 'Juin'], ['2026-07', 'Juil.'], ['2026-08', 'Août'], ['2026-09', 'Sept.'], ['2026-10', 'Oct.']];
export const steps = ['Devis', 'Accord', 'Commande', 'Réservation', 'Livraison', 'Facture', 'Paiement'];
export const initialSale = () => ({ stage: 0, quantity: 10, version: 1, approvedVersion: null, history: ['Devis DEV 041 · version 1 préparée.'] });
export function saleReducer(sale, action) {
  if (action.type === 'reset') return initialSale();
  if (action.type === 'quantity' && sale.stage <= 1 && Number.isInteger(action.value) && action.value >= 1 && action.value <= 100) {
    return { ...sale, quantity: action.value, stage: 0, version: sale.version + 1, approvedVersion: null, history: [...sale.history, `Version ${sale.version + 1} : quantité modifiée, nouvel accord requis.`] };
  }
  if (action.type !== 'next' || sale.stage >= 6) return sale;
  if (sale.stage >= 1 && sale.approvedVersion !== sale.version) return sale;
  const stage = sale.stage + 1;
  return { ...sale, stage, approvedVersion: stage === 1 ? sale.version : sale.approvedVersion, history: [...sale.history, `${steps[stage]} · ${stage === 1 ? `version ${sale.version} approuvée` : 'étape simulée'}.`] };
}
export const saleTotals = sale => ({ ht: sale.quantity * 250, tax: sale.quantity * 50, ttc: sale.quantity * 300, physical: sale.stage >= 4 ? 100 - sale.quantity : 100, reserved: sale.stage === 3 ? sale.quantity : 0, available: sale.stage >= 3 ? 100 - sale.quantity : 100 });
export function saleInvoice(sale) {
  return sale.stage >= 5 ? [{ id: 'FAC DEMO 041', client: 'CL 001', month: '2026-10', ht: saleTotals(sale).ht, paid: sale.stage === 6 ? saleTotals(sale).ttc : 0 }] : [];
}
export function totalsFor(month, sales = invoices) {
  const rows = sales.filter(row => row.month === month);
  const buys = purchases.filter(row => row.month === month);
  const sum = (list, value) => list.reduce((sum, row) => sum + value(row), 0);
  return { revenue: sum(rows, row => row.ht), purchases: sum(buys, row => row.ht), receivables: sum(rows, row => row.ht * 1.2 - row.paid), payables: sum(buys, row => row.ht * 1.2 - row.paid), cash: sum(rows, row => row.paid) - sum(buys, row => row.paid) };
}
