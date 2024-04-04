// PersonnageAll.js

import PersonnageProvider from "../../services/PersonnageProvider.js";

export default class PersonnageAll {
    constructor() {
        this.currentPage = 1; // Indique la page actuelle
        this.pageSize = 6; // Nombre de personnages à afficher par page
    }

    async render () {
        let personnages = await PersonnageProvider.fetchPersonnages(12);
        let firstPagePersonnages = personnages.slice(0, this.pageSize);
        let view =  /*html*/`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Mon Application test</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <input id="searchBar" class="form-control" type="search"
                             placeholder="Search" aria-label="Search" oninput="window.searchByName()">
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            <div class="container mt-4">
                <h2>Tous les personnages</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="personnageList">
                    ${this.renderPersonnages(firstPagePersonnages)}
                </div>
            </div>
            <button onclick="window.previousPage()" >Précédent</button>
            <button onclick="window.nextPage()">Suivant</button>
        `;
        return view;
    }

    renderPersonnages(personnages) {
        return personnages.map(personnage => 
            /*html*/`
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${personnage.image}" alt="Image du personnage" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
                    <div class="card-body">
                        <p id="name" class="card-text">${personnage.nom ? personnage.nom.slice(0,100) : ''}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="#/personnages/${personnage.id}" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                            </div>
                            <small class="text-body-secondary">${personnage.classe}</small>
                        </div>
                    </div>
                </div>
            </div>
            `
        ).join('\n');
    }

    async nextPage() {
        this.currentPage++;
        let personnages = await PersonnageProvider.fetchPersonnages(12);
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = startIndex + this.pageSize;
        let nextPagePersonnages = personnages.slice(startIndex, endIndex);
        let personnageListElement = document.getElementById('personnageList');
        personnageListElement.innerHTML = this.renderPersonnages(nextPagePersonnages);
    }

    async previousPage() {
        this.currentPage--;
        let personnages = await PersonnageProvider.fetchPersonnages(12);
        let startIndex = (this.currentPage - 1) * this.pageSize;
        let endIndex = startIndex + this.pageSize;
        let previousPagePersonnages = personnages.slice(startIndex, endIndex);
        let personnageListElement = document.getElementById('personnageList');
        personnageListElement.innerHTML = this.renderPersonnages(previousPagePersonnages);
    }
}

// Crée une instance unique de PersonnageAll
const personnageAll = new PersonnageAll();

// Définit les fonctions nextPage et previousPage
window.nextPage = function() {
    personnageAll.nextPage();
}

window.previousPage = function() {
    personnageAll.previousPage();
}


window.searchByName = function() {
    const searchBar = document.getElementById('searchBar');
    const persoList = document.getElementById('personnageList');
    const cards = persoList.querySelectorAll('.col');

    const entry = searchBar.value.trim().toLowerCase();

    cards.forEach(card => {
        const nameElement = card.querySelector('.card-text');
        if (nameElement) {
            const name = nameElement.textContent.toLowerCase();
            if (name.includes(entry)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });

    // Réinitialisation de l'affichage des cartes si le champ de recherche est vide
    if (entry === '') {
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }
}
