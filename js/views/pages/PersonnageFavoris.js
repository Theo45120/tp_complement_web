import PersonnageProvider from "../../services/PersonnageProvider.js";


export default class PersonnageFavoris {

    async render () {

        let view = ""
        console.log(localStorage.getItem('favoris'))
        let itemsArray = localStorage.getItem('favoris') ?
        JSON.parse(localStorage.getItem('favoris')) : [];
        console.log(itemsArray)


        itemsArray.forEach(async id => {

        let post = await PersonnageProvider.getPersonnage(id)
        
        view += /*html*/`
                    <div class="col">
                        <div class="card shadow-sm">
                            <img src="${post.image}" alt="Image du personnage" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
                            <div class="card-body">
                                <p id="name" class="card-text">${post.nom ? post.nom.slice(0,100) : ''}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="#/personnages/${post.id}" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                                    </div>
                                    <small class="text-body-secondary">${post.classe}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
        });
        return view;
    }

   
}

