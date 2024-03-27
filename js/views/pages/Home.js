// Instantiate API
import PersonnageProvider from "../../services/PersonnageProvider.js";

export default class Home {

    async render() {
        let personnages = await PersonnageProvider.fetchPersonnages(3)
        let html = personnages.map(personnage =>
            /*html*/`
            <div class="col">
            <div class="card shadow-sm">
            <img src="${personnage.image}" alt="Image du personnage" style="width: 100%; height: 200px; object-fit: cover; border-radius:10%;">
                <div class="card-body">
                    <p id="name" class="card-text">${personnage.nom ? personnage.nom.slice(0, 100) : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="#/articles/article.id" class="btn btn-sm btn-outline-secondary">+ détail sur les statistiques</a>
                        </div>
                        <small class="text-body-secondary">${personnage.classe}</small>
                    </div>
                </div>
            </div>
            </div>
            `
        ).join('\n ');
        
        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Solo leveling</h1>
                        <p class="lead ">"Solo Leveling" est une série de romans web sud-coréens écrite par Chu-Gong. Elle a été adaptée en un webcomic illustré par Jang Sung-rak. L'histoire tourne autour de Sung Jin-Woo, un chasseur rang E, le plus faible de tous les chasseurs. Cependant, il est propulsé dans un monde de monstres et de quêtes dangereuses lorsqu'il découvre qu'il possède un pouvoir unique lui permettant de devenir plus fort. </p> <br> </br>

                        <p class="lead">Le récit suit son parcours alors qu'il progresse de manière exponentielle, acquérant de nouvelles compétences et capacités. Au fur et à mesure que l'histoire avance, Jin-Woo se trouve impliqué dans des conspirations plus vastes et des enjeux mondiaux, se frayant un chemin à travers des donjons et affrontant des adversaires redoutables pour protéger ceux qui lui sont chers. </p> <br></br>
                        
                        <p class="lead"> " Solo Leveling " est apprécié pour son action intense, ses rebondissements captivants et son protagoniste charismatique. Il explore également des thèmes tels que la détermination, le dépassement de soi et la loyauté. La série a acquis une grande popularité tant en Corée qu'à l'international, attirant de nombreux fans de light novels et de webcomics.</p>
                        <p>
                            <a href="" class="btn btn-primary my-2">Main call to action</a>
                            <a href="" class="btn btn-secondary my-2">Secondary action</a>
                        </p>
                    </div>
                </div>
            </section>
            <h2>Les 3 premiers articles</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
    }
}