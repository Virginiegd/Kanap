//Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then(r => r.json()) // parse le résultat en json
    .then((products) => displayProducts(products)) // affiche le résulat de la fonction .then((data) => console.logo(data))
    .catch(error => console.log("Impossible de charger la page !")); // si le serveur ne répond pas, affiche ce message


function displayProducts(products) {
    const productContainer = document.getElementById("items");
    // création d'une boucle pour parcourir et insérer chaque élément
    for (const product of products) {
        const linkElement = document.createElement('a');
        linkElement.href = "./product.html?_id=" + product._id;// création du lien vers la page product.html et récupération de l'id
        const articleElement = document.createElement('article');
        const pictureElement = document.createElement('img');
        pictureElement.src = product.imageUrl;
        pictureElement.alt = product.altTxt;
        const nameElement = document.createElement('h3');
        nameElement.innerHTML = product.name;
        const paragrapheElement = document.createElement('p');
        paragrapheElement.innerHTML = product.description;

        productContainer.appendChild(linkElement);
        linkElement.appendChild(articleElement);
        articleElement.appendChild(pictureElement);
        articleElement.appendChild(nameElement);
        articleElement.appendChild(paragrapheElement);
    }
}







