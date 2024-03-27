import Utils        from '../../services/Utils.js'
import PersonnageProvider from "../../services/PersonnageProvider.js";

export default class PersonnageShow {
    async render () {
        let request = Utils.parseRequestURL()
        let post = await PersonnageProvider.getPersonnage(request.id)
        
        return /*html*/`
            <section class="section">
                <h1> Nom du personnage : ${post.nom}</h1>
                <h2> Classe : ${post.classe} </h2>
                <h2> Description :  </h2>
                <h2> Statistique </h2>
                <ul>
                    <li> Force : ${post.stats.force} </li>
                    <li> Vitesse : ${post.stats.vitesse} </li>
                    <li> Magie : ${post.stats.magie} </li>
                </ul>
            </section>
            <p><a href="/">back to home</a></p>
            <p><a href="#/articles">back to all articles</a></p>
        `
    }
}

