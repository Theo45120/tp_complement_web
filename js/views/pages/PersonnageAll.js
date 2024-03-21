import PersonnageProvider from "../../services/PersonnageProvider.js";

export default class PersonnageAll {

    async render () {
        let personnages = await PersonnageProvider.fetchPersonnages(50);
        let view =  /*html*/`
            <h2>Tous les personnages</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${ personnages.map(personnage => 
                    /*html*/`
                    <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${personnage.classe}</text></svg>
                        <div class="card-body">
                            <p class="card-text">${personnage.nom ? personnage.nom.slice(0,100) : ''}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <a href="#/articles/article.id" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                                </div>
                                <small class="text-body-secondary">${personnage.classe}</small>
                            </div>
                        </div>
                    </div>
                    </div>
                    `
                    ).join('\n ')
                }
            </div>
        `
        return view
    }

}