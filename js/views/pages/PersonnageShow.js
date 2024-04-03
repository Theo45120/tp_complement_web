import Utils        from '../../services/Utils.js'
import PersonnageProvider from "../../services/PersonnageProvider.js";


window.submitNote = function(id) {
    const note = document.getElementById('note').value;
    PersonnageProvider.PutNote(id, note);
}

window.add = function(id) {
    let itemsArray = localStorage.getItem('favoris') ?
    JSON.parse(localStorage.getItem('favoris')) : [];

    if (!itemsArray.includes(id)){
        itemsArray.push(id);
        localStorage.setItem('favoris', JSON.stringify(itemsArray));
    }
    console.log(localStorage.getItem('favoris'))
  }


window.addOrRemoveFavorite = function(id) {
    let itemsArray = localStorage.getItem('favoris') ? JSON.parse(localStorage.getItem('favoris')) : [];

    if (!itemsArray.includes(id)){
        itemsArray.push(id);
        localStorage.setItem('favoris', JSON.stringify(itemsArray));
        document.getElementById('favoriteButton').innerText = "Supprimer des favoris";
    } else {
        let itemsArrayfilter = itemsArray.filter(itemId => itemId !== id);
        localStorage.setItem('favoris', JSON.stringify(itemsArrayfilter));
        document.getElementById('favoriteButton').innerText = "Ajouter en favoris";
        console.log(localStorage.getItem('favoris'));
    }
    console.log(localStorage.getItem('favoris'));
}


export default class PersonnageShow {


    async render () {
        let request = Utils.parseRequestURL()
        let post = await PersonnageProvider.getPersonnage(request.id)
        let itemsArray = localStorage.getItem('favoris') ? JSON.parse(localStorage.getItem('favoris')) : [];
        let nameButton = "";
        if (!itemsArray.includes(request.id)){
            nameButton = "Ajouter en favoris";
        } else {
            nameButton = "Supprimer des favoris";
        }
        
        return /*html*/`
            <section class="section">
                <h1> Nom du personnage : ${post.nom}</h1>
                <h2> Classe : ${post.classe} </h2>
                <h2> Description :  </h2>
                <p> Une description en attente</p>
                <h2> Statistique </h2>
                <ul>
                    <li> Force : ${post.stats.force} </li>
                    <li> Vitesse : ${post.stats.vitesse} </li>
                    <li> Magie : ${post.stats.magie} </li>
                </ul>
                <div>
                    <h3> Note actuelle : ${post.note}</h3>
                    <label for="note">Note: (0-5):</label>
                    <input type="number" id="note" name="note" min="0" max="5" />
                    <input type="submit" onclick="submitNote('${request.id}')" value="NOTER">
                </div>
                <button id='favoriteButton' onclick="addOrRemoveFavorite('${request.id}')">${nameButton}<i class="fa-solid fa-plus"></i></button>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/articles">back to all articles</a></p>
        `
    }
}

