import PersonnageProvider from "../../services/PersonnageProvider.js";


export default class PersonnageFavoris {

    async render () {

        console.log(localStorage.getItem('favoris'))
        let itemsArray = localStorage.getItem('favoris') ?
        JSON.parse(localStorage.getItem('favoris')) : [];
        console.log(itemsArray)

        let personnagesFavs = await Promise.all(itemsArray.map(async id => {
            let personnage = await PersonnageProvider.getPersonnage(id);
            return personnage;
        }));

        console.log(personnagesFavs);

        let view = /*html*/`
            <div class="container mt-4">
                <h1>Mes favoris</h1>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" id="personnageList">
                ${personnagesFavs.map(personnage =>
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
                        `).join('\n')}
                </div>
            </div>`;
        console.log(view);
        return view;
    }
}

