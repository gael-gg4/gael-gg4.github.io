"use strict";

document.addEventListener("DOMContentLoaded", () => {
  chargerDonnees();
});

async function chargerDonnees() {
  try {
    const reponse = await fetch("assets/data/pcm26-afrique-asie.json");

    if (!reponse.ok) {
      throw new Error(
        `Erreur HTTP ${reponse.status} : impossible de charger le JSON.`
      );
    }

    const donnees = await reponse.json();

    afficherResumeSaisons(donnees.resumeSaisons);
    afficherPerformances(donnees.performances);
    afficherGrandsTours(donnees.grandsToursMonuments);
  } catch (erreur) {
    console.error("Erreur lors du chargement des données :", erreur);

    afficherErreur("resume-saisons-body", 9);
    afficherErreur("performances-body", 8);
    afficherErreur("grands-tours-body", 9);
  }
}

function afficherResumeSaisons(saisons = []) {
  const tbody = document.getElementById("resume-saisons-body");

  if (!tbody) {
    return;
  }

  viderElement(tbody);

  if (saisons.length === 0) {
    afficherMessageVide(tbody, 9);
    return;
  }

  saisons.forEach((saison) => {
    const ligne = creerLigne([
      saison.saison,
      saison.niveau,
      saison.sponsor1,
      saison.sponsor2,
      saison.sponsor3,
      saison.budget,
      saison.classement,
      saison.victoires,
      saison.premiereVideo
    ]);

    tbody.appendChild(ligne);
  });
}

function afficherPerformances(performances = []) {
  const tbody = document.getElementById("performances-body");

  if (!tbody) {
    return;
  }

  viderElement(tbody);

  if (performances.length === 0) {
    afficherMessageVide(tbody, 8);
    return;
  }

  performances.forEach((performance) => {
    const ligne = creerLigne([
      performance.saison,
      performance.classement,
      performance.individuel,
      performance.victoiresCN,
      performance.victoiresWT,
      performance.victoiresPro,
      performance.victoires1,
      performance.victoires2
    ]);

    tbody.appendChild(ligne);
  });
}

function afficherGrandsTours(epreuves = []) {
  const tbody = document.getElementById("grands-tours-body");

  if (!tbody) {
    return;
  }

  viderElement(tbody);

  if (epreuves.length === 0) {
    afficherMessageVide(tbody, 9);
    return;
  }

  epreuves.forEach((epreuve) => {
    const ligne = creerLigne([
      epreuve.saison,
      epreuve.giro,
      epreuve.tourDeFrance,
      epreuve.vuelta,
      epreuve.milanoSanremo,
      epreuve.tourDesFlandres,
      epreuve.parisRoubaix,
      epreuve.liegeBastogneLiege,
      epreuve.ilLombardia
    ]);

    tbody.appendChild(ligne);
  });
}

function creerLigne(valeurs) {
  const ligne = document.createElement("tr");

  valeurs.forEach((valeur) => {
    const cellule = document.createElement("td");

    // textContent évite d'injecter du HTML provenant du JSON.
    cellule.textContent = valeur ?? "—";
    ligne.appendChild(cellule);
  });

  return ligne;
}

function viderElement(element) {
  element.replaceChildren();
}

function afficherMessageVide(tbody, nombreColonnes) {
  const ligne = document.createElement("tr");
  const cellule = document.createElement("td");

  cellule.colSpan = nombreColonnes;
  cellule.textContent = "Aucune donnée disponible.";

  ligne.appendChild(cellule);
  tbody.appendChild(ligne);
}

function afficherErreur(idTbody, nombreColonnes) {
  const tbody = document.getElementById(idTbody);

  if (!tbody) {
    return;
  }

  tbody.replaceChildren();

  const ligne = document.createElement("tr");
  const cellule = document.createElement("td");

  cellule.colSpan = nombreColonnes;
  cellule.textContent = "Impossible de charger les données.";
  cellule.classList.add("table-error");

  ligne.appendChild(cellule);
  tbody.appendChild(ligne);
}