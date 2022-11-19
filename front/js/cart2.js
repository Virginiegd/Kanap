let product = [];
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

for (j = 0; j < saveProductLocalStorage.length; j ++) {
  product.push(saveProductLocalStorage[j].id);
  


   cartFull = cartFull + `
    <article class="cart__item" data-id="${saveProductLocalStorage[j].id}" data-color="${saveProductLocalStorage[j].color}">
                <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${saveProductLocalStorage[j].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
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



 } if (j === saveProductLocalStorage.length) { 
 cartContainer.innerHTML = cartFull;
 } }

    
           