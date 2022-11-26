// Récupère les données enregistrées dans le localestorage
let addProduct = JSON.parse(localStorage.getItem("product"));
console.log(addProduct);

let productsApi = [];
let quantityTotal = [];
let priceTotal = [];

const cartContainer = document.querySelector("#cart__items");

getProductApi(addProduct);

async function getProductApi(products) {
  if (products === null || products ==0) {
    const cartEmpty =
    `<article class="container-cart-empty">
      <div> Le panier est vide. Veuillez rajouter des articles avant de passer commande.</div> </article>`;

  cartContainer.innerHTML = cartEmpty;

  } else {
    for (let j =0; j < products.length; j++) {
      let productApi = null;
      await fetch("http://localhost:3000/api/products/" + products[j].id)
      .then((res) => res.json())
      .then((data) => (productApi = data));
      if (!productApi) {
        continue;
      }
      productApi.color = products[j].color;
      productApi.quantity = products[j].quantity;
      productsApi.push(productApi);
    }
displayProducts();
  }
}

function displayProducts() {

  const cartContainer = document.querySelector("#cart__items");
  cartContainer.innerHTML = productsApi
  // L'objet map permet de parcourir des éléments selon leur ordre d'insertion
  .map((product) => {
    return `<article class="cart__item" data-id="¤${product.id}" data-color="${product.color}">
                  <div class="cart__item__img">
                  <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${product.name}</h2>              
                      <p>${product.color}</p>
                      <p>${product.price} €</p>
                      <p></p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
        `;
  })

  // modifie le nombre de produits sélectionné et met à jour l'information dans le Locale Storage
  function modifyQuantity() {
    let kanapQuantity = document.querySelectorAll(".itemQuantity");
    for (let k = 0; k < kanapQuantity.length; k++) {
      kanapQuantity[k].addEventListener("change", (event) => {
        event.preventDefault();
        let newQuantity = kanapQuantity[k].value;
        const newAddItem = {
          id: addProduct[k].id,
          src: addProduct[k].src,
          alt: addProduct[k].alt,
          name: addProduct[k].name,
          color: addProduct[k].color,
          quantity: newQuantity
        };

        addProduct[k] = newAddItem;
        localStorage.setItem("product", JSON.stringify(addProduct));

        alert("La quantité a bien été mise à jour.")
      })
    }
  };

  modifyQuantity();


  // supprime l'article sélectionné à la fois du DOM et du localestorage
  function deleteProduct() {
    let deleteKanap = document.querySelectorAll(".deleteItem");
    for (let l = 0; l < deleteKanap.length; l++) {
      deleteKanap[l].addEventListener("click", (event) => {
        event.preventDefault();

        let supprId = addProduct[l].id;
        let supprColor = addProduct[l].color;

        addProduct = addProduct.filter(e => e.id !== supprId || e.color !== supprColor);

        localStorage.setItem("product", JSON.stringify(addProduct));

        alert("L'article sélectionné a bien été supprimé du panier");
        window.location.href = "cart.html";

      });
    }
  }

  deleteProduct();

  function getQuantityTotal() {
    for (let m = 0; m < addProduct.length; m++){
      let globalQuantity = parseInt (addProduct[m].quantity);
      console.log(globalQuantity);
      quantityTotal.push(globalQuantity);
      console.log(quantityTotal);
    }
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    const additionQuantity = quantityTotal.reduce(reducer, 0);
    console.log(additionQuantity);

    let affichQuantity = document.querySelector("#totalQuantity");
affichQuantity.innerHTML = additionQuantity;
    
  }
  
  getQuantityTotal();

  
// Calcule le prix total du panier en fonction de la quantité choisie
function getPriceTotal() {
  for (let n = 0; n < productsApi.length; n++ ) {
    let globalPrice = productsApi[n].price;
    let priceQuantity = productsApi[n].quantity;
    console.log(priceTotal);
    console.log(globalPrice);
    console.log(priceQuantity);
    priceTotal.push(globalPrice * priceQuantity);
  }
  const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
  const additionPrice = priceTotal.reduce(reducer, 0);
  console.log (additionPrice);

  let affichPrix = document.querySelector("#totalPrice");
affichPrix.innerHTML = additionPrice;
}

getPriceTotal();



  
}
















/*  let picture = document.querySelector(".cart__item__img");
      let imageProduct = document.createElement("img");
      imageProduct.src = product.imageUrl;
      imageProduct.alt = product.altTxt;
      picture.appendChild(imageProduct);
      
      let name = document.querySelector("h2");
      let nameProduct = document.createElement("h2");
      name.setAttribute("class", "cart__item__content__description");
        nameProduct.innerHTML = product.name;
        name.appendChild(nameProduct);*/


        /*let addProduct = JSON.parse(localStorage.getItem("product")); //transforme les chaînes de caractère en tableau
console.log(addProduct);

const cartContainer = document.querySelector("#cart__items");

if (addProduct === null || addProduct == 0) {
  const cartEmpty =
    `<article class="container-cart-empty">
      <div> Le panier est vide. Veuillez rajouter des articles avant de passer commande.</div> </article>`;

  cartContainer.innerHTML = cartEmpty;

} else {


  let cartFull = [];

 

  for (j = 0; j < addProduct.length; j++) {

    fetch(`http://localhost:3000/api/products/` + _id)
  .then(r => r.json())
  .then((products) => displayKanap(products))
  .catch();


    function displayKanap(products) {
      let price = document.querySelector("p");
      let priceProduct = document.createElement("p");
      priceProduct.innerHTML = `${products.price} €`;
      price.appendChild(priceProduct);
    }



    cartFull = cartFull + `
        <article class="cart__item" data-id="¤${addProduct[j].id}" data-color="${addProduct[j].color}">
                  <div class="cart__item__img">
                  <img src="${addProduct[j].src}" alt="${addProduct[j].alt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${addProduct[j].name}</h2>              
                      <p>${addProduct[j].color}</p>
                      <p></p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProduct[j].quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>
        `;
  }


  if (j == addProduct.length) {
    cartContainer.innerHTML = cartFull;
  }*/