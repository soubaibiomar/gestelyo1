import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ChartBar,
  SquaresFour,
  Receipt,
  Package,
  Users,
  CaretDown,
  List,
  X,
  Check,
  MagnifyingGlass,
  Bell,
  Plus,
  CaretRight,
  ShoppingCart,
  Briefcase,
  Lightning,
  Cube,
  PlayCircle,
  Globe,
  Gear,
  ClipboardText,
  Wallet,
} from "@phosphor-icons/react";
import "@fontsource-variable/manrope";
import "./styles.css";

const formatMoney = (value) =>
  new Intl.NumberFormat("fr-MA").format(value) + " MAD";
const orders = [
  {
    id: "CMD-0042",
    client: "Agence Horizon",
    amount: 135000,
    state: "Confirmée",
    date: "08 oct. 2026",
  },
  {
    id: "CMD-0041",
    client: "Global Tech",
    amount: 89000,
    state: "En préparation",
    date: "07 oct. 2026",
  },
  {
    id: "CMD-0040",
    client: "Atlas Services",
    amount: 67000,
    state: "Livrée",
    date: "06 oct. 2026",
  },
];
const moduleData = [
  {
    name: "CRM",
    icon: Users,
    copy: "Gérez vos clients et opportunités de A à Z.",
    color: "blue",
  },
  {
    name: "Ventes",
    icon: Briefcase,
    copy: "Devis, commandes et factures simplifiés.",
    color: "cyan",
  },
  {
    name: "Achats",
    icon: ShoppingCart,
    copy: "Fournisseurs, demandes et bons de commande.",
    color: "teal",
  },
  {
    name: "Stock",
    icon: Package,
    copy: "Suivi des stocks et des disponibilités.",
    color: "blue",
  },
  {
    name: "Comptabilité",
    icon: Receipt,
    copy: "Une vision de vos recettes et dépenses.",
    color: "violet",
  },
  {
    name: "Projets",
    icon: Briefcase,
    copy: "Planifiez, suivez et coordonnez vos projets.",
    color: "blue",
  },
];
const sectorData = [
  {
    name: "Agences & Services",
    copy: "Projets, clients et facturation simplifiés",
    photo: "photo-1497366811353-6870744d04b2",
    position: "center",
    module: "Projets",
  },
  {
    name: "Commerce & Distribution",
    copy: "Gestion des stocks et des commandes",
    photo: "photo-1586528116311-ad8dd3c8310d",
    position: "center",
    module: "Stock",
  },
  {
    name: "Production",
    copy: "Planification et suivi de votre activité",
    photo: "photo-1717386255767-52643970d483",
    position: "center",
    module: "Achats",
  },
  {
    name: "Retail & E-commerce",
    copy: "Ventes multicanales et inventaire unifié",
    photo: "photo-1441986300917-64674bd600d8",
    position: "center",
    module: "Ventes",
  },
  {
    name: "Organisations",
    copy: "Processus centralisés et collaboration",
    photo: "photo-1497366754035-f200968a6e72",
    position: "center",
    module: "CRM",
  },
];
const photoUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&q=80`;
function Logo() {
  return (
    <span className="brand">
      <img src="/gestelyo-logo.png" alt="Gestelyo" width="192" height="96" />
    </span>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [view, setView] = useState("Tableau de bord");
  const [month, setMonth] = useState("Octobre 2026");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState(false);
  const [completed, setCompleted] = useState([false, true, false, false]);
  const [modal, setModal] = useState(null);
  const [faq, setFaq] = useState(null);
  const modalRef = useRef(null);
  const filtered = orders.filter((o) =>
    `${o.client} ${o.id}`.toLowerCase().includes(query.toLowerCase()),
  );
  const open = (value) => {
    setModal(value);
    modalRef.current.showModal();
    setMenu(false);
  };
  const explore = (next = "Tableau de bord") => {
    setView(next);
    setQuery("");
    setMenu(false);
    document
      .getElementById("produit")
      .scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
  };
  const navItems = [
    { name: "Tableau de bord", icon: SquaresFour },
    ...moduleData,
    { name: "Ressources humaines", icon: Users },
    { name: "Rapports", icon: ChartBar },
    { name: "Paramètres", icon: Gear },
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <div className="hero-background" />
      <header className="site-header wrap">
        <a href="#" aria-label="Gestelyo, accueil">
          <Logo />
        </a>
        <nav
          className={menu ? "main-nav open" : "main-nav"}
          aria-label="Navigation principale"
        >
          <a href="#produit" onClick={() => setMenu(false)}>
            Produit <CaretDown />
          </a>
          <a href="#modules" onClick={() => setMenu(false)}>
            Modules <CaretDown />
          </a>
          <a href="#secteurs" onClick={() => setMenu(false)}>
            Secteurs <CaretDown />
          </a>
          <button onClick={() => open({ type: "tarifs" })}>Tarifs</button>
          <a href="#questions" onClick={() => setMenu(false)}>
            Ressources <CaretDown />
          </a>
        </nav>
        <div className="header-actions">
          <span className="language">
            <Globe size={18} /> FR
          </span>
          <button className="login" onClick={() => open({ type: "connexion" })}>
            Se connecter
          </button>
          <button
            className="button primary small"
            onClick={() => open({ type: "demo" })}
          >
            Découvrir la démo <ArrowRight size={17} />
          </button>
        </div>
        <button
          className="menu-toggle"
          aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <List />}
        </button>
      </header>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-copy">
            <span className="eyebrow">ERP INTELLIGENT POUR ENTREPRISES</span>
            <h1>
              Centralisez.
              <br />
              Automatisez.
              <br />
              <span>Développez.</span>
            </h1>
            <p>
              Gestelyo réunit vos ventes, achats, stocks, comptabilité et
              opérations. Une vision claire de votre activité, pour prendre de
              meilleures décisions.
            </p>
            <div className="hero-buttons">
              <button
                className="button primary"
                onClick={() => open({ type: "demo" })}
              >
                Découvrir la démo <ArrowRight size={19} />
              </button>
              <button className="button secondary" onClick={() => explore()}>
                Voir le produit <PlayCircle size={21} />
              </button>
            </div>
            <div className="benefits">
              {[
                [Cube, "Tout-en-un", "Vos processus, au même endroit"],
                [Lightning, "Gain de temps", "Un quotidien mieux organisé"],
                [
                  ChartBar,
                  "Pilotage en temps réel",
                  "Des décisions plus rapides",
                ],
              ].map(([Icon, title, text]) => (
                <div key={title}>
                  <span className="benefit-icon">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <p>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="product-showcase" id="produit">
            <div className="product-window">
              <aside className="product-sidebar">
                <div className="app-brand">
                  <img src="/gestelyo-symbol.png" alt="" />
                  Gestelyo
                </div>
                <nav aria-label="Modules de démonstration">
                  {navItems.map(({ name, icon: Icon }) => (
                    <button
                      key={name}
                      className={view === name ? "active" : ""}
                      aria-pressed={view === name}
                      onClick={() => {
                        setView(name);
                        setQuery("");
                      }}
                    >
                      <Icon size={15} />
                      <span>{name}</span>
                      {name !== "Tableau de bord" && <CaretRight size={10} />}
                    </button>
                  ))}
                </nav>
                <span className="sidebar-caption">ESPACE DE DÉMONSTRATION</span>
              </aside>
              <div className="product-main">
                <div className="app-topbar">
                  <MagnifyingGlass className="top-search-icon" size={14} />
                  <label className="search-box">
                    <MagnifyingGlass size={12} />
                    <input
                      aria-label="Rechercher une commande"
                      placeholder="Rechercher une commande…"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        if (view !== "Tableau de bord" && view !== "Ventes")
                          setView("Ventes");
                      }}
                    />
                  </label>
                  <button
                    className="icon-button notification-button"
                    aria-label="Afficher les notifications"
                    aria-expanded={notice}
                    onClick={() => setNotice(!notice)}
                  >
                    <Bell size={17} />
                    <i />
                  </button>
                  <div className="profile">
                    <span>OS</span>
                    <div>
                      Espace Gestelyo<small>Administrateur · démo</small>
                    </div>
                    <CaretDown size={10} />
                  </div>
                </div>
                {notice && (
                  <div className="notification" role="status">
                    <strong>Bienvenue dans Gestelyo</strong>
                    <p>
                      Explorez les modules et les commandes avec des données
                      fictives.
                    </p>
                  </div>
                )}
                <div className="dashboard">
                  <div className="dashboard-heading">
                    <h2>{view}</h2>
                    {["Tableau de bord", "Rapports"].includes(view) ? (
                      <label>
                        <span className="sr-only">
                          Période du tableau de bord
                        </span>
                        <select
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        >
                          <option>Octobre 2026</option>
                          <option>Septembre 2026</option>
                        </select>
                      </label>
                    ) : (
                      <span className="sample-label">Données fictives</span>
                    )}
                  </div>
                  {["Tableau de bord", "Rapports"].includes(view) ? (
                    <>
                      <div className="metrics">
                        <Metric
                          label="Chiffre d’affaires"
                          value={
                            month === "Octobre 2026" ? "1 250 000" : "1 116 000"
                          }
                          unit="MAD"
                          trend="12 %"
                          icon={ChartBar}
                        />
                        <Metric
                          label="Commandes"
                          value={month === "Octobre 2026" ? "320" : "296"}
                          trend="8 %"
                          icon={ShoppingCart}
                        />
                        <Metric
                          label="Clients actifs"
                          value={month === "Octobre 2026" ? "142" : "134"}
                          trend="6 %"
                          icon={Users}
                        />
                        <Metric
                          label="Marge"
                          value={month === "Octobre 2026" ? "24 %" : "22 %"}
                          trend="2 pts"
                          icon={ChartBar}
                        />
                      </div>
                      <div className="charts">
                        <RevenueChart month={month} />
                        <div className="sales-chart panel">
                          <div className="panel-heading">
                            <h3>Répartition des ventes</h3>
                            <span>Par canal</span>
                          </div>
                          <div className="donut-content">
                            <div
                              className="donut"
                              role="img"
                              aria-label="Répartition fictive : direct 45 %, site web 20 %, partenaires 20 %, autres 15 %."
                            />
                            <ul>
                              {[
                                ["Direct", "45 %"],
                                ["Site web", "20 %"],
                                ["Partenaires", "20 %"],
                                ["Autres", "15 %"],
                              ].map(([label, val], index) => (
                                <li key={label}>
                                  <i
                                    style={{
                                      background: [
                                        "#0864ff",
                                        "#1c9df2",
                                        "#24b8c0",
                                        "#b5d3ff",
                                      ][index],
                                    }}
                                  />
                                  {label}
                                  <span>{val}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="dashboard-bottom">
                        <OrderTable
                          rows={filtered}
                          onSelect={(row) => open({ type: "order", row })}
                          onAll={() => setView("Ventes")}
                        />
                        <div className="tasks panel">
                          <div className="panel-heading">
                            <h3>Tâches récentes</h3>
                            <button onClick={() => setView("Projets")}>
                              Tout voir <ArrowRight size={10} />
                            </button>
                          </div>
                          {[
                            "Valider la facture #F-042",
                            "Préparer la commande #CMD-0043",
                            "Relance client : Atlas Services",
                            "Mettre à jour le stock",
                          ].map((task, index) => (
                            <button
                              className={`task ${completed[index] ? "done" : ""}`}
                              key={task}
                              aria-pressed={completed[index]}
                              onClick={() =>
                                setCompleted(
                                  completed.map((v, i) =>
                                    i === index ? !v : v,
                                  ),
                                )
                              }
                            >
                              <span>
                                {completed[index] ? (
                                  <Check size={9} weight="bold" />
                                ) : (
                                  <ClipboardText size={9} />
                                )}
                              </span>
                              <span>{task}</span>
                              <small>
                                {index < 2 ? "Aujourd’hui" : "07 oct."}
                              </small>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : view === "Ventes" ? (
                    <OrderTable
                      rows={filtered}
                      onSelect={(row) => open({ type: "order", row })}
                    />
                  ) : (
                    <ModuleView
                      view={view}
                      onSelect={(row) => open({ type: "order", row })}
                    />
                  )}
                </div>
                <div className="demo-disclosure">
                  Prototype interactif · données et entreprises fictives
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sectors-section" id="secteurs">
          <div className="sectors-layout wrap">
            <div className="sectors-heading">
              <span className="eyebrow">POUR DIFFÉRENTS SECTEURS</span>
              <h2>
                Une solution adaptable
                <br />à votre activité
              </h2>
            </div>
            <div className="sector-grid">
              {sectorData.map((item) => (
                <button
                  className="sector-card"
                  key={item.name}
                  onClick={() => explore(item.module)}
                >
                  <img
                    src={photoUrl(item.photo)}
                    style={{ objectPosition: item.position }}
                    alt=""
                    loading="lazy"
                    width="240"
                    height="100"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.copy}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="modules-section wrap" id="modules">
          <div className="modules-heading">
            <div>
              <span className="eyebrow">DES MODULES COMPLÉMENTAIRES</span>
              <h2>
                Tout ce dont vous avez besoin
                <br />
                pour gérer et faire grandir votre entreprise
              </h2>
            </div>
            <div>
              <p>
                Un même espace pour relier vos métiers, garder une vision claire
                et retrouver le contrôle de votre activité.
              </p>
              <button onClick={() => explore()}>
                Découvrir les modules <ArrowRight size={15} />
              </button>
            </div>
          </div>
          <div className="module-grid">
            {moduleData.map(({ name, icon: Icon, copy, color }) => (
              <button
                className="module-card"
                key={name}
                onClick={() => explore(name)}
              >
                <span className={`module-icon ${color}`}>
                  <Icon size={23} weight="duotone" />
                </span>
                <div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section className="faq-section wrap" id="questions">
          <div>
            <span className="eyebrow">POUR ALLER PLUS LOIN</span>
            <h2>
              Une question avant
              <br />
              de commencer ?
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "Que puis-je tester dans cette démo ?",
                "Naviguez entre les modules, recherchez une commande, consultez son détail, changez de période et cochez les tâches. Toutes les informations sont fictives.",
              ],
              [
                "Gestelyo est-il déjà disponible ?",
                "Cette page présente un prototype de la plateforme. Les fonctionnalités finales, les intégrations et la disponibilité commerciale restent à confirmer.",
              ],
              [
                "Quels sont les tarifs ?",
                "Les offres ne sont pas encore publiées. Aucun prix ni abonnement ne peut être souscrit depuis cette démonstration.",
              ],
            ].map(([title, answer], index) => (
              <article key={title}>
                <h3>
                  <button
                    aria-expanded={faq === index}
                    aria-controls={`faq-${index}`}
                    onClick={() => setFaq(faq === index ? null : index)}
                  >
                    {title}
                    <Plus
                      size={17}
                      style={{
                        transform: faq === index ? "rotate(45deg)" : undefined,
                      }}
                    />
                  </button>
                </h3>
                <p id={`faq-${index}`} hidden={faq !== index}>
                  {answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="wrap site-footer">
        <Logo />
        <span>Votre entreprise. Une vision claire.</span>
        <small>© 2026 Gestelyo · Prototype de présentation</small>
      </footer>
      <dialog
        ref={modalRef}
        className="modal"
        aria-labelledby="modal-title"
        onClick={(e) => {
          if (e.target === modalRef.current) modalRef.current.close();
        }}
      >
        <button
          className="modal-close icon-button"
          aria-label="Fermer"
          onClick={() => modalRef.current.close()}
        >
          <X size={22} />
        </button>
        <img className="modal-symbol" src="/gestelyo-symbol.png" alt="" />
        {modal?.type === "order" ? (
          <>
            <span className="eyebrow">COMMANDE DE DÉMONSTRATION</span>
            <h2 id="modal-title">{modal.row.id}</h2>
            <p>{modal.row.client}</p>
            <dl>
              <div>
                <dt>Date</dt>
                <dd>{modal.row.date}</dd>
              </div>
              <div>
                <dt>Montant</dt>
                <dd>{formatMoney(modal.row.amount)}</dd>
              </div>
              <div>
                <dt>Statut</dt>
                <dd>{modal.row.state}</dd>
              </div>
            </dl>
            <p className="modal-note">
              Données fictives. Aucun paiement ou envoi n’est effectué.
            </p>
          </>
        ) : (
          <>
            <span className="eyebrow">DÉCOUVRIR GESTELYO</span>
            <h2 id="modal-title">
              {modal?.type === "tarifs"
                ? "Une offre à construire."
                : modal?.type === "connexion"
                  ? "Bienvenue dans la démo."
                  : "Prenez les commandes."}
            </h2>
            <p>
              {modal?.type === "tarifs"
                ? "Les tarifs et les offres commerciales ne sont pas encore publiés. En attendant, explorez la plateforme avec notre démonstration interactive."
                : modal?.type === "connexion"
                  ? "La connexion à un compte réel n’est pas encore disponible. Vous pouvez explorer le prototype sans inscription et sans fournir de données personnelles."
                  : "Découvrez le tableau de bord, les modules et le suivi des commandes. Un aperçu interactif, sans inscription, avec des données fictives."}
            </p>
            <button
              className="button primary"
              onClick={() => {
                modalRef.current.close();
                explore();
              }}
            >
              Explorer la plateforme <ArrowRight size={18} />
            </button>
          </>
        )}
      </dialog>
    </>
  );
}
function Metric({ label, value, unit, trend, icon: Icon }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>
        {value} <small>{unit}</small>
      </strong>
      <span className="metric-trend">
        ↑ {trend}
        <span className="sr-only">, variation fictive</span>
      </span>
      <Icon size={23} weight="duotone" />
    </div>
  );
}
function RevenueChart({ month }) {
  const values =
    month === "Octobre 2026"
      ? [28, 70, 54, 120, 83, 110, 90, 170, 155, 220, 194, 246]
      : [22, 48, 39, 98, 65, 87, 76, 143, 130, 180, 160, 201];
  const points = values
    .map((v, i) => `${36 + i * 33},${126 - v * 0.4}`)
    .join(" ");
  return (
    <div className="revenue-chart panel">
      <div className="panel-heading">
        <h3>Évolution du chiffre d’affaires</h3>
        <span>12 derniers mois</span>
      </div>
      <svg
        className="line-chart"
        viewBox="0 0 422 157"
        role="img"
        aria-label={`Chiffre d’affaires fictif sur les douze mois se terminant en ${month.toLowerCase()}, en milliers de dirhams.`}
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0965ff" stopOpacity=".2" />
            <stop offset="100%" stopColor="#0965ff" stopOpacity=".015" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line
              x1="36"
              x2="403"
              y1={126 - i * 37}
              y2={126 - i * 37}
              stroke="#e9eff8"
            />
            <text x="3" y={129 - i * 37}>
              {i * 100}
              {i > 0 ? "k" : ""}
            </text>
          </g>
        ))}
        {values.map((v, i) => (
          <line
            key={i}
            x1={36 + i * 33}
            x2={36 + i * 33}
            y1="15"
            y2="126"
            stroke="#f0f4fa"
          />
        ))}
        <polygon points={`36,126 ${points} 399,126`} fill="url(#chart-fill)" />
        <polyline
          points={points}
          fill="none"
          stroke="#0864ff"
          strokeWidth="1.8"
        />
        {values.map((v, i) => (
          <circle
            key={i}
            cx={36 + i * 33}
            cy={126 - v * 0.4}
            r="2"
            fill="#0864ff"
          />
        ))}
        {(month === "Octobre 2026"
          ? [
              "Nov.",
              "Déc.",
              "Jan.",
              "Fév.",
              "Mars",
              "Avr.",
              "Mai",
              "Juin",
              "Juil.",
              "Août",
              "Sept.",
              "Oct.",
            ]
          : [
              "Oct.",
              "Nov.",
              "Déc.",
              "Jan.",
              "Fév.",
              "Mars",
              "Avr.",
              "Mai",
              "Juin",
              "Juil.",
              "Août",
              "Sept.",
            ]
        ).map((m, i) => (
          <text key={i} x={36 + i * 33} y="148" textAnchor="middle">
            {m}
          </text>
        ))}
      </svg>
    </div>
  );
}
function OrderTable({ rows, onSelect, onAll }) {
  return (
    <div className="orders panel">
      <div className="panel-heading">
        <h3>{onAll ? "Dernières commandes" : "Commandes"}</h3>
        {onAll && (
          <button onClick={onAll}>
            Tout voir <ArrowRight size={10} />
          </button>
        )}
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <button
                    onClick={() => onSelect(row)}
                    aria-label={`Consulter ${row.id}`}
                  >
                    {row.id}
                  </button>
                </td>
                <td>{row.client}</td>
                <td>{formatMoney(row.amount)}</td>
                <td>
                  <span
                    className={`status ${row.state === "En préparation" ? "pending" : ""}`}
                  >
                    {row.state}
                  </span>
                </td>
                <td>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="empty-state">
            Aucune commande trouvée. Essayez un autre nom.
          </p>
        )}
      </div>
    </div>
  );
}
function ModuleView({ view, onSelect }) {
  const content = {
    CRM: [
      ["Agence Horizon", "3 opportunités", "À suivre"],
      ["Global Tech", "1 opportunité", "En discussion"],
      ["Atlas Services", "2 opportunités", "Client actif"],
    ],
    Achats: [
      ["ACH-0024 · Fournitures", "12 400 MAD", "À valider"],
      ["ACH-0023 · Matériel", "8 500 MAD", "Reçue"],
      ["ACH-0022 · Mobilier", "24 000 MAD", "En cours"],
    ],
    Stock: [
      ["Bureau chêne naturel", "18 unités", "Disponible"],
      ["Chaise de travail", "6 unités", "À surveiller"],
      ["Lampe de bureau", "32 unités", "Disponible"],
    ],
    Comptabilité: [
      ["Recettes du mois", "284 000 MAD", "Enregistrées"],
      ["Dépenses du mois", "124 000 MAD", "Enregistrées"],
      ["Solde indicatif", "160 000 MAD", "Exemple"],
    ],
    Projets: [
      ["Refonte du site web", "Équipe marketing", "En cours"],
      ["Aménagement des bureaux", "Équipe opérations", "À planifier"],
      ["Catalogue automne", "Équipe commerciale", "Terminé"],
    ],
    "Ressources humaines": [
      ["Équipe commerciale", "8 personnes", "Active"],
      ["Équipe opérations", "12 personnes", "Active"],
      ["Équipe administrative", "4 personnes", "Active"],
    ],
    Paramètres: [
      ["Entreprise", "Espace Gestelyo", "Démonstration"],
      ["Devise", "Dirham marocain", "MAD"],
      ["Langue", "Français", "FR"],
    ],
  };
  return (
    <div className="module-detail panel">
      <h3>
        {view === "Paramètres"
          ? "Configuration de cet aperçu"
          : `Votre espace ${view.toLowerCase()}`}
      </h3>
      <p>Un aperçu des informations réunies dans ce module.</p>
      {(content[view] || []).map(([label, value, state]) => (
        <div className="data-row" key={label}>
          <strong>{label}</strong>
          <span>{value}</span>
          <span className="status">{state}</span>
        </div>
      ))}
      <div className="module-tip">
        <span>Démonstration</span>Ces informations illustrent le produit. Elles
        ne proviennent pas d’une entreprise réelle.
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

