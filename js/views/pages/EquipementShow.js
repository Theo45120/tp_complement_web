import Utils        from '../../services/Utils.js'
import EquipementProvider from "../../services/EquipementProvider.js";

export default class EquipementShow {
    async render () {
        let request = Utils.parseRequestURL()
        let post = await EquipementProvider.getEquipement(request.id)
        
        return /*html*/`
        TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
            <section class="section">
                <h1> Nom du personnage : ${post.nom}</h1>
                <h2> Type : ${post.type} </h2>
                <h2> Description :  </h2>
                <p>${post.description}</p>
                <h2> Statistique </h2>
                <ul>
                    <li> Force : ${post.attributs.force} </li>
                    <li> Vitesse : ${post.attributs.vitesse} </li>
                    <li> Magie : ${post.attributs.magie} </li>
                </ul>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/articles">back to all articles</a></p>
        `
    }
}

