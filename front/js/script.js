/**Récupération des données de l'API :
 * Parse le résultat en json
 * Affiche le résulat de la fonction => .then((data) => console.log(data))
 * Si le serveur ne répond pas, affiche ce message
 */
fetch("http://localhost:3000/api/products")
    .then(r => r.json())
    .then((products) => displayProducts(products))
    .catch(error => console.log("Impossible de charger la page !"));

//Fonction pour afficher les produits
function displayProducts(products) {
    const productContainer = document.getElementById("items");
    // Création d'une boucle pour parcourir et insérer chaque élément
    for (const product of products) {
        const linkElement = document.createElement('a');
        // Création du lien vers la page product.html et récupération de l'id
        linkElement.href = "./product.html?_id=" + product._id; 
        const articleElement = document.createElement('article');
        const pictureElement = document.createElement('img');
        pictureElement.src = product.imageUrl;
        pictureElement.alt = product.altTxt;
        const nameElement = document.createElement('h3');
        nameElement.innerHTML = product.name;
        const paragrapheElement = document.createElement('p');
        paragrapheElement.innerHTML = product.description;

        //Rattache chaque élément à son élément parent
        productContainer.appendChild(linkElement);
        linkElement.appendChild(articleElement);
        articleElement.appendChild(pictureElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(paragrapheElement);
    }
};







