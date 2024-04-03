import Utils        from '../../services/Utils.js'
import PersonnageProvider from "../../services/PersonnageProvider.js";
import EquipementProvider from "../../services/EquipementProvider.js";

window.submitNote = function(id) {
    const note = document.getElementById('note').value;
    PersonnageProvider.PutNote(id, note);
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

window.addItem = async function(id) {
  var thelist = document.getElementById("listeItem");
  var idx = thelist.selectedIndex;
  var content = thelist.options[idx].innerHTML;
  let idItem = thelist.options[idx].id;
  console.log(content);
  PersonnageProvider.PutEquipement(id, idItem);

  let equipement = await EquipementProvider.getEquipement(idItem);
  let divEquipement = document.getElementById("Equipement");
  divEquipement.innerHTML = /*html*/`
  <div class="col">
      <div class="card shadow-sm">
          <img src="${equipement.image}" alt="Image de l'équipement" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
          <div class="card-body">
              <p id="name" class="card-text">${equipement.nom ? equipement.nom.slice(0,100) : ''}</p>
              <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                      <a href="#/equipements/${equipement.id}" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                  </div>
                  <small class="text-body-secondary">${equipement.type}</small>

              </div>
          </div>
      </div>
  </div>
  `;
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

        let equipements = await EquipementProvider.fetchEquipements(50);


        let equipementEquipe = null;
        if(post.equipements != [] || post.equipements != ""){
            equipementEquipe = await EquipementProvider.getEquipement(post.equipements);
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
                <div>
                    <select id="listeItem" name="thelist">
                    ${equipements.map(equipement => 
                        /*html*/`
                        <option id="${equipement.id}">${equipement.nom}</option>
                        `
                    ).join('\n')}
                    </select>
                    <button  onclick="addItem('${request.id}')">Ajouter l'équipement<i class="fa-solid fa-plus"></i></button>
                </div>
                <div>
                    <h2>Equipement équipé</h2>
                    <div id="Equipement">
                    ${equipementEquipe != ''  ? 
                        `<div class="col">
                            <div class="card shadow-sm">
                                <img src="${equipementEquipe.image}" alt="Image de l'équipement" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
                                <div class="card-body">
                                    <p id="name" class="card-text">${equipementEquipe.nom ? equipementEquipe.nom.slice(0,100) : ''}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <a href="#/equipements/${equipementEquipe.id}" class="btn btn-sm btn-outline-secondary">Voir les statistiques</a>
                                        </div>
                                        <small class="text-body-secondary">${equipementEquipe.type}</small>

                                    </div>
                                </div>
                            </div>
                        </div>`
                    : ''}
                    </div>
                </div>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/articles">back to all articles</a></p>
        `
    }
}

