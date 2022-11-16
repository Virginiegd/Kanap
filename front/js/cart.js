let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau
console.log(saveProductLocalStorage); 

const cartContainer = document.getElementById("cart__items");
console.log(cartContainer);


if (saveProductLocalStorage === null) {
  const cartEmpty =
  `<article class="container-cart-empty">
    <div> Le panier est vide</div> </article>`;
cartContainer.innerHTML = cartEmpty;
    
} else {

  let cartFull = []; 
 let product = [];

for (j = 0; j < saveProductLocalStorage.length; j ++) {

   cartFull = cartFull + `
    <article class="cart__item" data-id="${saveProductLocalStorage[j].id}" data-color="${saveProductLocalStorage[j].color}">
                <div class="cart__item__img">
                <img src="${saveProductLocalStorage[j].image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${saveProductLocalStorage[j].name}</h2>
                    <p>${saveProductLocalStorage[j].color}</p>
                    <p>${saveProductLocalStorage[j].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${saveProductLocalStorage[j].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
    `
;

fetch("http://localhost:3000/api/products_id=${saveProductLocalStorage[j].id}") // récupère directement la key _id dans la requête fetch
    .then(r => r.json())
    .then((product) => displayProduct(product))
    .catch(error => console.log("Impossible de charger la page !"))

// affiche les éléments correspondant au produit sélectionné    
function displayProduct(product) {
    let imageProduct = document.createElement("img")
    imageProduct.src = product.imageUrl
    imageProduct.alt = product.altTxt
    cartContainer.appendChild(imageProduct)
    let nameElement = document.querySelector("#title")
    nameElement.innerHTML = product.name
    let priceElement = document.querySelector("#price")
    priceElement.innerHTML = product.price
}
 } if (j === saveProductLocalStorage.length) { 
 cartContainer.innerHTML = cartFull;
    }
    
} 
