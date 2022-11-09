// récupération de l'url
const url = window.location.search;

//extraction de l'id
const params = new URLSearchParams(url);
console.log(params);
const _id = params.get("_id");
console.log(_id);

fetch("http://localhost:3000/api/products/" + _id) // récupère directement la key _id dans la requête fetch
    .then(r => r.json())
    .then((product) => displayProduct(product))
    .catch(error => console.log("Impossible de charger la page !"))

// affiche les éléments correspondant au produit sélectionné    
function displayProduct(product) {
    let pictureElement = document.querySelector (".item__img") //La méthode querySelector() retourne le premier élement dans le document correspondant au sélecteur
    let imageProduct = document.createElement ("img")
    imageProduct.src = product.imageUrl
    imageProduct.alt = product.altTxt
    pictureElement.appendChild(imageProduct)  
    let descriptionElement = document.querySelector("#description")
    descriptionElement.innerHTML = product.description
    let nameElement = document.querySelector("#title")
    nameElement.innerHTML = product.name
    let priceElement = document.querySelector("#price")
    priceElement.innerHTML = product.price

    // création de la boucle pour le choix des couleurs
    for (let i in product.colors) { //on reprend la valeur de la fonction précédente et on la rattache à .colors
        let optionColor = document.createElement("option");
        optionColor.setAttribute("value", product.colors[i]); //Element.setAttribute(name, value);
        optionColor.innerHTML = product.colors[i];
        let selectColor = document.getElementById("colors");
        selectColor.appendChild(optionColor);
    }
}

// ecoute du bouton "Ajouter au panier"
const listenToCart = document.querySelector("#addToCart");
console.log(listenToCart);
listenToCart.addEventListener('click', (event) => {
    event.preventDefault();

    // récupération des options sélectionnées par le client et envoi du panier
    const idColor = document.querySelector("#colors");
    const choiceColor = idColor.value;

    const idQuantity = document.querySelector("#quantity");
    const choiceQuantity = idQuantity.value;

    const selection = {
        id: _id,
        color: choiceColor,
        quantity: choiceQuantity
    }

    console.log(selection);

    // stocke la récupération des valeurs dans le local storage
        let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau

    // si des produits sont déjà enregistrés dans le local storage
    if(saveProductLocalStorage) {

    } 
    // si aucun produit n'est enregistré dans le local storage
    else {
        saveProductLocalStorage = []; // crée un tableau vide
        saveProductLocalStorage.push(selection);
        console.log(saveProductLocalStorage);
        localStorage.setItem("product", JSON.stringify(saveProductLocalStorage)); // transforme le tableau en chaîne de caractère
    }
});


/*
// enregistre le panier (à vérifier)
function saveCart (cart) {
    localStorage.setItem("cart", JSON.stringify(cart)); // transforme un tableau en chaîne de caractère
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) { // si le panier est vide
        return [];  
    } else {
        return JSON.parse(cart); // transforme de nouveau en tableau
    }
}

function addCart(product) {
    let cart = getCart();
    let foundProduct = cart.find()(p => p._id == product._id);
    if (foundProduct != undefined) {
        foundProduct.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    saveCart(cart);
}



function removeCart(product) {
    let cart = getCart();
    cart = cart.filter(p => p.id != product._id);
    saveCart(cart);
}

function changeQuantity(product, quantity) {
    let cart = getCart();
    let foundProduct = cart.find(p => p._id == product._id);
    if (foundProduct != undefined) {
        foundProduct.quantity += quantity;
        if (foundProduct.quantity <= 0) {
            removeCart(foundProduct);
        } else {
            saveCart(cart);
        }
    }
}

function getNumberProduct() {
    let cart = getCart();
    let number = 0;
    for(let product of cart) {
        number += product.quantity;
    }
    return number;
}

function getTotalPrice() {
    let cart = getCart();
    let price = 0;
    for (let product of cart) {
        price += product.quantity * product.price;
    }
    return price;
}*/
