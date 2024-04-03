import EquipementProvider from "../../services/EquipementProvider.js";

export default class equipementAll {

    async render () {
        let equipements = await EquipementProvider.fetchEquipements(50);
        let view =  /*html*/`
            <h2>Tous les equipements</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${equipements.map(equipement => 
                    /*html*/`
                    <div class="col">
                        <div class="card shadow-sm">
                            <img src="${equipement.image}" alt="Image du equipement" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
                            <div class="card-body">
                                <p class="card-text">${equipement.nom ? equipement.nom.slice(0,100) : ''}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="#/equipements/${equipement.id}" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                                    </div>
                                    <small class="text-body-secondary">${equipement.type}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                ).join('\n')}
            </div>
        `;
        return view;
    }
}
