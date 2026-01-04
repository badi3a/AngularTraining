/* =========================================
   Angular 18 — Workshops data (ESPRIT)
   Remplace la liste SOA par Angular
========================================= */

// ---- 1) DATA (workshops Angular) ----
const items = [
    {
        type: "workshop",
        badge: "main",
        title: "Workshop 0 — Étude de cas (EventHub)",
        desc: "Présentation du projet fil rouge : acteurs, besoins, modèle de données.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/main", icon: "bi-git" },
            { label: "PDF", url: "https://github.com/badi3a/AngularTraining/blob/main/Workshop%20n%C2%B00%20-Etude%20de%20cas.pdf", icon: "bi-file-earmark-pdf" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-01",
        title: "Workshop 1 — Mise en place de l’environnement",
        desc: "Installer l’environnement Angular 18 et créer un projet.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-01-setup", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-02",
        title: "Workshop 2 — Démarrer avec Angular",
        desc: "Premier projet, structure, routing de base, interface.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-02-getting-started", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-03",
        title: "Workshop 3 — Composants & Data Binding",
        desc: "Liste d’événements, interactions, recherche.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-03-manipulate-component", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-04",
        title: "Workshop 4 — Modules & Lazy Loading",
        desc: "Feature modules, routing interne, routes paramétrées.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-04-ManipulateModule", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-05",
        title: "Workshop 5 — Directives & Pipes",
        desc: "Manipulation des directives et pipes (natifs & personnalisés).",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-05-directives-pipes", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-06",
        title: "Workshop 6 — Input & Output",
        desc: "Composants imbriqués et communication parent/enfant.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-06-manipulate-input-output", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-07",
        title: "Workshop 7 — Reactive Forms",
        desc: "Validation, messages d’erreur, validateur personnalisé, FormArray.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-07-reactive-forms", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-08",
        title: "Workshop 8 — Template Driven Forms",
        desc: "Formulaire template-driven et validation.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-08-template-driven-forms", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-09",
        title: "Workshop 9 — Services & HttpClient",
        desc: "Consommation API REST avec HttpClient et observables.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-09-services-httpclient", icon: "bi-box-arrow-up-right" },
        ],
    },
    {
        type: "workshop",
        badge: "workshop-10",
        title: "Workshop 10 — Standalone Components",
        desc: "Créer, importer et réutiliser des composants standalone.",
        links: [
            { label: "Branche", url: "https://github.com/badi3a/AngularTraining/tree/workshop-10-standalone-components", icon: "bi-box-arrow-up-right" },
        ],
    },
];

// ---- 2) RENDER ----
const container = document.getElementById("cardsContainer");
const filter = document.getElementById("filterType");

function cardTemplate(item) {
    const badgeHtml = item.badge
        ? `<span class="badge text-bg-secondary">${item.badge}</span>`
        : "";

    const linksHtml = (item.links || [])
        .map(
            (l) => `
      <a class="btn btn-sm ${l.label === "PDF" ? "btn-outline-dark" : "btn-primary"}"
         href="${l.url}" target="_blank" rel="noopener">
        <i class="bi ${l.icon || "bi-box-arrow-up-right"} me-1"></i> ${l.label}
      </a>`
        )
        .join("");

    return `
    <div class="col-md-6 col-lg-4" data-type="${item.type}">
      <div class="card border-0 shadow-soft h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start gap-2">
            <h3 class="h6 fw-semibold mb-1">${item.title}</h3>
            ${badgeHtml}
          </div>
          <p class="text-body-secondary mb-3">${item.desc}</p>
          <div class="d-flex flex-wrap gap-2">
            ${linksHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function render(list) {
    if (!container) return;
    container.innerHTML = list.map(cardTemplate).join("");
}

function applyFilter() {
    const value = filter?.value || "all";
    if (value === "all") return render(items);
    return render(items.filter((x) => x.type === value));
}

// ---- 3) INIT ----
render(items);

if (filter) {
    // Ici, on garde seulement "workshop" + "all" (si tu veux)
    // Si ton select contient encore course/lab, ça marche aussi.
    filter.addEventListener("change", applyFilter);
}
