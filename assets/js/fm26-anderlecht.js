"use strict";

document.addEventListener("DOMContentLoaded", chargerDonnees);

async function chargerDonnees() {
  try {
    const reponse = await fetch("assets/data/fm26-anderlecht.json");

    if (!reponse.ok) {
      throw new Error(
        `Erreur HTTP ${reponse.status} : impossible de charger le JSON.`
      );
    }

    const donnees = await reponse.json();

    afficherCompetitions(donnees.competitions);
    afficherStatistiques(donnees.statistiques);
  } catch (erreur) {
    console.error("Erreur lors du chargement des données :", erreur);

    afficherErreur("competitions-body", 7);
    afficherErreur("statistiques-body", 6);
  }
}

function afficherCompetitions(competitions) {
  const tbody = document.getElementById("competitions-body");

  if (!tbody) {
    return;
  }

  tbody.replaceChildren();

  if (!Array.isArray(competitions) || competitions.length === 0) {
    afficherMessageVide(tbody, 7);
    return;
  }

  competitions.forEach((competition) => {
    const ligne = creerLigne([
      competition.saison,
      competition.championnat,
      competition.coupeBelgique,
      competition.superCoupeBelgique,
      competition.coupeEurope,
      competition.superCoupeEurope,
      competition.mondialClubs
    ]);

    tbody.appendChild(ligne);
  });
}

function afficherStatistiques(statistiques) {
  const tbody = document.getElementById("statistiques-body");

  if (!tbody) {
    return;
  }

  tbody.replaceChildren();

  if (!Array.isArray(statistiques) || statistiques.length === 0) {
    afficherMessageVide(tbody, 6);
    return;
  }

  statistiques.forEach((statistique) => {
    const ligne = creerLigne([
      statistique.saison,
      statistique.joueurCle,
      statistique.meilleurButeur,
      statistique.meilleurPasseur,
      statistique.transfertRecord,
      statistique.premiereVideo
    ]);

    tbody.appendChild(ligne);
  });
}

function creerLigne(valeurs) {
  const ligne = document.createElement("tr");

  valeurs.forEach((valeur) => {
    const cellule = document.createElement("td");

    cellule.textContent =
      valeur !== undefined && valeur !== null && valeur !== ""
        ? valeur
        : "/";

    ligne.appendChild(cellule);
  });

  return ligne;
}

function afficherMessageVide(tbody, nombreColonnes) {
  const ligne = document.createElement("tr");
  const cellule = document.createElement("td");

  cellule.colSpan = nombreColonnes;
  cellule.textContent = "Aucune donnée disponible.";
  cellule.classList.add("table-message");

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