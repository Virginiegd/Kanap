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
      .then((data) => (productApi = data))
      .catch(error => console.log("Impossible de charger la page !")); // si le serveur ne répond pas, affiche ce message

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
        getQuantityTotal();
       location.reload() 
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

  // Calcule le nombre de produits totals dans le panier
   function getQuantityTotal() {
    totalQuantity = 0;
    for (let m = 0; m < addProduct.length; m++){
      let newQuantity = parseInt (addProduct[m].quantity, 10); 
      // converti la valeur sélectionné pour la quantité dans le LS en une chaîne, le transforme en nombre sur la base décimale de 10
     
      totalQuantity += newQuantity;
    }
  
    let quantityTotal = document.querySelector("#totalQuantity");
   quantityTotal.innerHTML = totalQuantity;
   
  }
  
  getQuantityTotal();


  // Calcule le prix total du panier en fonction de la quantité choisie
function getPriceTotal() {
  for (let n = 0; n < productsApi.length; n++ ) {
    let globalPrice = productsApi[n].price;
    let priceQuantity = productsApi[n].quantity;
    priceTotal.push(globalPrice * priceQuantity);
  }
  const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
  const additionPrice = priceTotal.reduce(reducer);
  console.log (additionPrice);

  let affichPrix = document.querySelector("#totalPrice");
affichPrix.innerHTML = additionPrice;

}

getPriceTotal();

};