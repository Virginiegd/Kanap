//Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then(r => r.json()) // parse le résultat en json
    .then((products) => displayProducts(products)) // affiche le résulat de la fonction .then((data) => console.logo(data))
    .catch(error => console.log("Impossible de charger la page !")) // si le serveur ne répond pas, affiche ce message

    
function displayProducts (products) {
   let productContainer = document.getElementById("items")
   // création d'une boucle pour parcourir et insérer chaque élément
    for (const product of products) {
        let linkElement = document.createElement('a')
        linkElement.href = "./product.html?_id" + product._id
        let articleElement = document.createElement('article')
        let pictureElement = document.createElement('img')
        pictureElement.src = product.imageUrl
        pictureElement.alt = product.altTxt
        let nameElement = document.createElement('h3')
        nameElement.innerHTML = product.name
        let paragrapheElement = document.createElement('p')
        paragrapheElement.innerHTML = product.description
        
        productContainer.appendChild(linkElement)
        linkElement.appendChild(articleElement)
        articleElement.appendChild(pictureElement)
        articleElement.appendChild(nameElement)
        articleElement.appendChild(paragrapheElement)
    }
}







