// Récupère les données enregistrées dans le localestorage
let addProduct = JSON.parse(localStorage.getItem("product"));
console.log(addProduct);

let productsApi = [];
let quantityTotal = [];
let priceTotal = [];
let responseServeur = [];

let buyProducts= JSON.parse(localStorage.getItem("orderProducts"));

const cartContainer = document.querySelector("#cart__items");

getProductApi(addProduct);

async function getProductApi(products) {
  if (products === null || products == 0) {
    const cartEmpty =
      `<article class="container-cart-empty">
      <div> Le panier est vide. Veuillez rajouter des articles avant de passer commande.</div> </article>`;

    cartContainer.innerHTML = cartEmpty;

  } else {
    for (let j = 0; j < products.length; j++) {
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
    for (let m = 0; m < addProduct.length; m++) {
      let newQuantity = parseInt(addProduct[m].quantity, 10);
      // converti la valeur sélectionné pour la quantité dans le LS en une chaîne, le transforme en nombre sur la base décimale de 10

      totalQuantity += newQuantity;
    }

    let quantityTotal = document.querySelector("#totalQuantity");
    quantityTotal.innerHTML = totalQuantity;

  }

  getQuantityTotal();


  // Calcule le prix total du panier en fonction de la quantité choisie
  function getPriceTotal() {
    for (let n = 0; n < productsApi.length; n++) {
      let globalPrice = productsApi[n].price;
      let priceQuantity = productsApi[n].quantity;
      priceTotal.push(globalPrice * priceQuantity);
    }
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    const additionPrice = priceTotal.reduce(reducer);
    console.log(additionPrice);

    let affichPrix = document.querySelector("#totalPrice");
    affichPrix.innerHTML = additionPrice;

  }

  getPriceTotal();

};

// Formulaire de contact

// On récupère tous les "id"
const firstNameForm = document.getElementById("firstName");
const lastNameForm = document.getElementById("lastName");
const addressForm = document.getElementById("address");
const cityForm = document.getElementById("city");
const emailForm = document.getElementById("email");

// On crée des variables vides pour récupérer les informations qui seront déclarés par les visiteurs
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

//Formulaire pour le prénom
firstNameForm.addEventListener("input", (event) => {
  event.preventDefault();
  valueFirstName;
  if (event.target.value.length == 0) {
    console.log("rien");
    firstNameErrorMsg.innerHTML = "";
    valueFirstName = null;
    console.log(valueFirstName);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 25) {
    firstNameErrorMsg.innerHTML = "Le prénom est obligatoire et doit contenir entre 3 et 25 caractères.";
    valueFirstName = null;
    console.log("Le prénom est obligatoire");

  }
  if (event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/)) { // regex
    firstNameErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueFirstName = event.target.value;
    console.log("success");
    console.log(valueFirstName);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 25
  ) {
    firstNameErrorMsg.innerHTML = "Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres";
    valueFirstName = null;
    console.log("tout c'est bien passé");
  }

});

// Formulaire pour le nom
lastNameForm.addEventListener("input", (event) => {
  event.preventDefault();
  valueLastName;
  if (event.target.value.length == 0) {
    console.log("rien");
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null; // permet à ce que l'information entrée par le visiteur soit remise à zéro quand il l'a change
    console.log(valueLastName);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 25) {
    lastNameErrorMsg.innerHTML = "Le nom est obligatoire et doit contenir entre 3 et 25 caractères.";
    valueLastName = null;
    console.log("Le nom est obligatoire");

  }
  if (event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/)) { // regex
    lastNameErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueLastName = event.target.value;
    console.log("success");
    console.log(valueLastName);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 25
  ) {
    lastNameErrorMsg.innerHTML = "Le nom ne doit pas contenir de caractères spéciaux ni de chiffres";
    valueLastName = null;
    console.log("tout c'est bien passé");
  }
});
  

// Formulaire pour l'adresse
addressForm.addEventListener("input", (event) => {
  event.preventDefault();
  valueAddress;
  if (event.target.value.length == 0) {
    console.log("rien");
    addressErrorMsg.innerHTML = "";
    valueAddress = null;
    console.log(valueAddress);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 35) {
    addressErrorMsg.innerHTML = "L'adresse est obligatoire.";
    valueAddress = null;
    console.log("L'adresse est obligatoire");

  }
  if (event.target.value.match(/^[0-9]{1,4} [a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/)) { // regex
    addressErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueAddress = event.target.value;
    console.log("success");
    console.log(valueAddress);
  }
  if (
    !event.target.value.match(/^[0-9]{1,4} [a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 35
  ) {
    addressErrorMsg.innerHTML = "L'adresse ne doit pas contenir de caractères spéciaux";
    valueAddress = null;
    console.log("tout c'est bien passé");
  }
});

// Formulaire pour la ville
cityForm.addEventListener("input", (event) => {
  event.preventDefault();
  valueCity;
  if (event.target.value.length == 0) {
    console.log("rien");
    cityErrorMsg.innerHTML = "";
    valueCity = null;
    console.log(valueCity);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 35) {
    cityErrorMsg.innerHTML = "La ville est obligatoire.";
    valueCity = null;
    console.log("La ville est obligatoire");

  }
  if (event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/)) { // regex
    cityErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueCity = event.target.value;
    console.log("success");
    console.log(valueCity);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 35
  ) {
    cityErrorMsg.innerHTML = "La ville ne doit pas contenir de caractères spéciaux";
    valueCity = null;
    console.log("tout c'est bien passé");
  }
});

// Formulaire pour l'email
emailForm.addEventListener("input", (event) => {
  event.preventDefault();
  if (event.target.value.length == 0) {
    console.log("rien");
    emailErrorMsg.innerHTML = "";
    valueEmail = null;
    console.log(valueEmail);
  }
  else if (event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    emailErrorMsg.innerHTML = "";
    valueEmail = event.target.value;
    console.log(valueEmail);
  }
  if (!event.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && !event.target.value.length == 0) {
    emailErrorMsg.innerHTML = "L'email n'est pas au bon format.";
    valueEmail = null;
  }
});

//Envoie du formulaire

let formContact = document.querySelector(".cart__order");

formContact.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("vérification");

  if(valueFirstName && valueLastName && valueAddress && valueCity && valueEmail ) {
    console.log("c'est bon envoie");
  const finalOrder = JSON.parse(localStorage.getItem("product"));
    let orderId = [];
  console.log(finalOrder);
    console.log(orderId);

    finalOrder.forEach((order) => {
      orderId.push(order.id);
    });

    console.log(orderId);

    const data = {
      contact:{
        firstName : valueFirstName,
        lastName : valueLastName,
        address : valueAddress,
        city : valueCity,
        email : valueEmail,
      },
      products : orderId,
    };

    console.log(data);

    // fetch post
 

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body:JSON.stringify(data),
    })
    .then((res) => res.json())
    .then((promise) => {
      responseServeur = promise;
      console.log(responseServeur);
    

    const dataOrder = {
      order:responseServeur.orderId,
    };

   if(buyProducts == null) {
      buyProducts = [];
      buyProducts.push(dataOrder);
      localStorage.setItem("orderProducts", JSON.stringify(buyProducts));
    
    } else if(buyProducts !=null) {
      buyProducts.push(dataOrder);
      localStorage.setItem("orderProducts", JSON.stringify(buyProducts));
    }
    
    localStorage.removeItem("product");
    location.href = "confirmation.html";
  });

  //Vide les informations du formulaire pour éviter les erreurs
    firstNameForm.value="";
    lastNameForm.value="";
    addressForm.value="";
    cityForm.value="";
    emailForm.value="";
    valueFirstName=null;
    valueLastName=null;
    valueAddress=null;
    valueCity=null;
    valueEmail=null;
  
} else {
    alert("Veuillez vérifiez le formulaire.")
  }
});

console.log(buyProducts);