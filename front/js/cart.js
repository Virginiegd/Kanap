// Récupère les données enregistrées dans le localStorage
let addProduct = JSON.parse(localStorage.getItem("product"));

let productsApi = [];
let quantityTotal = [];
let priceTotal = [];
let responseServeur = [];

// Création d'une variable pour stocker la commande
let buyProducts = JSON.parse(localStorage.getItem("orderProducts"));

// Récupère les données dans une variable
getProductApi(addProduct);

// Affichage des produits dans le panier
async function getProductApi(products) {

  const cartContainer = document.querySelector("#cart__items");

  if (products === null || products == 0) { // si le panier est vide
    const cartEmpty =
      `<article class="container-cart-empty">
      <div> Le panier est vide. Veuillez rajouter des articles à partir de la page d'accueil avant de passer commande. Merci de votre compréhension.</div> </article>`;

    cartContainer.innerHTML = cartEmpty;

  } else {
    for (let j = 0; j < products.length; j++) {
      let productApi = null;
      await fetch("http://localhost:3000/api/products/" + products[j].id)
        .then((res) => res.json())
        .then((data) => (productApi = data))
        .catch(error => console.log("Impossible de charger la page !"));

      // Récupère les données du localStorage dans des variables
      productApi.color = products[j].color;
      productApi.quantity = products[j].quantity;
      productsApi.push(productApi);
    }
    // Appel la fonction qui va permettre d'afficher les produits
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


  // Créer une alerte quand la quantité dépasse les valeurs autorisées
  function alertQuantity() {
    let alertKanapQuantity = document.querySelectorAll(".itemQuantity");
    for (let o = 0; o < alertKanapQuantity.length; o++) {
      alertKanapQuantity[o].addEventListener("change", function (event) {
        if (event.target.value >= 1 && event.target.value <= 100) {
          alertKanapQuantity[o].quantity = event.target.value;
          localStorage.setItem("product", JSON.stringify(addProduct));
        } else {
          alert("Attention, la quantité du produit doit être supérieur à 0 et inférieur à 100. Elle sera automatiquement remise à 1.");
          event.target.value = 1;
          alertKanapQuantity[o].quantity = event.target.value;
          localStorage.setItem("product", JSON.stringify(addProduct));
        }
      });
    };
  };

  alertQuantity();

  // Modifie le nombre de produits sélectionné et met à jour l'information dans le localStorage
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

        alert("La quantité a bien été mise à jour.");
        getQuantityTotal();
        location.reload(); // recharge la page
      })
    }
  };

  modifyQuantity();

  // Supprime l'article sélectionné à la fois du DOM et du localStorage
  function deleteProduct() {
    let deleteKanap = document.querySelectorAll(".deleteItem");
    for (let l = 0; l < deleteKanap.length; l++) {
      deleteKanap[l].addEventListener("click", (event) => {
        event.preventDefault();

        let supprId = addProduct[l].id;
        let supprColor = addProduct[l].color;

        /** La méthode filter() crée et retourne un nouveau tableau contenant 
         * tous les éléments du tableau d'origine qui remplissent une condition 
         * déterminée par la fonction callback
        */
        addProduct = addProduct.filter(e => e.id !== supprId || e.color !== supprColor);

        localStorage.setItem("product", JSON.stringify(addProduct));

        alert("L'article sélectionné a bien été supprimé du panier.");
        window.location.href = "cart.html"; // réactualise la page pour bien prendre en compte la suppression

      });
    }
  }

  deleteProduct();

  // Calcule le nombre de produits total dans le panier
  function getQuantityTotal() {
    totalQuantity = 0;
    for (let m = 0; m < addProduct.length; m++) {
      let newQuantity = parseInt(addProduct[m].quantity, 10);
      // Converti la valeur sélectionnée pour la quantité dans le localStorage en nombre sur la base décimale de 10

      totalQuantity += newQuantity;
    }

    let quantityTotal = document.querySelector("#totalQuantity");
    quantityTotal.innerHTML = totalQuantity;

  };

  getQuantityTotal();


  // Calcule le prix total du panier en fonction de la quantité choisie
  function getPriceTotal() {
    for (let n = 0; n < productsApi.length; n++) {
      let globalPrice = productsApi[n].price;
      let priceQuantity = productsApi[n].quantity;
      priceTotal.push(globalPrice * priceQuantity);
    }
    /** La méthode reduce() applique une fonction qui est un « accumulateur » et 
     * qui traite chaque valeur d'une liste (de la gauche vers la droite) 
     * afin de la réduire à une seule valeur
     */
    const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    const additionPrice = priceTotal.reduce(reducer);

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

// On crée des variables vides pour récupérer les informations qui seront déclarées par les visiteurs
let valueFirstName, valueLastName, valueAddress, valueCity, valueEmail;

//Formulaire pour le prénom
firstNameForm.addEventListener("input", (event) => {
  valueFirstName;
  if (event.target.value.length == 0) { // cible le nombre de caractères
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
    console.log(valueFirstName);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 25
  ) {
    firstNameErrorMsg.innerHTML = "Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres.";
    valueFirstName = null;
  }
});

// Formulaire pour le nom
lastNameForm.addEventListener("input", (event) => {
  valueLastName;
  if (event.target.value.length == 0) {
    console.log("rien");
    lastNameErrorMsg.innerHTML = "";
    valueLastName = null; // permet à ce que l'information entrée par le visiteur soit remise à zéro quand il la change
    console.log(valueLastName);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 25) {
    lastNameErrorMsg.innerHTML = "Le nom est obligatoire et doit contenir entre 3 et 25 caractères.";
    valueLastName = null;
    console.log("Le nom est obligatoire.");

  }
  if (event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/)) { // regex
    lastNameErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueLastName = event.target.value;
    console.log(valueLastName);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,25}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 25
  ) {
    lastNameErrorMsg.innerHTML = "Le nom ne doit pas contenir de caractères spéciaux ni de chiffres.";
    valueLastName = null;
  }
});

// Formulaire pour l'adresse
addressForm.addEventListener("input", (event) => {
  valueAddress;
  if (event.target.value.length == 0) {
    console.log("rien");
    addressErrorMsg.innerHTML = "";
    valueAddress = null;
    console.log(valueAddress);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 45) {
    addressErrorMsg.innerHTML = "L'adresse est obligatoire et doit contenir entre 3 et 45 caractères.";
    valueAddress = null;
    console.log("L'adresse est obligatoire et doit contenir entre 3 et 45 caractères.");

  }
  if (event.target.value.match(/^[0-9]{1,5} [a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,45}$/)) { // regex
    addressErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueAddress = event.target.value;
    console.log(valueAddress);
  }
  if (
    !event.target.value.match(/^[0-9]{1,5} [a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,45}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 45
  ) {
    addressErrorMsg.innerHTML = "L'adresse ne respecte pas le bon format (ex: 523 allée des Plantes). Les caractères spéciaux sont interdits.";
    valueAddress = null;
  }
});

// Formulaire pour la ville
cityForm.addEventListener("input", (event) => {
  valueCity;
  if (event.target.value.length == 0) {
    cityErrorMsg.innerHTML = "";
    valueCity = null;
    console.log(valueCity);
  }
  else if (event.target.value.length < 3 || event.target.value.length > 35) {
    cityErrorMsg.innerHTML = "La ville est obligatoire et doit contenir entre 3 et 35 caractères.";
    valueCity = null;
    console.log("La ville est obligatoire.");

  }
  if (event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/)) { // regex
    cityErrorMsg.innerHTML = ""; // on récupère directement l'id pour le message d'erreur
    valueCity = event.target.value;
    console.log(valueCity);
  }
  if (
    !event.target.value.match(/^[a-z A-Z áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,35}$/) &&
    event.target.value.length > 3 &&
    event.target.value.length < 35
  ) {
    cityErrorMsg.innerHTML = "La ville ne doit pas contenir de caractères spéciaux ni de chiffres.";
    valueCity = null;
  }
});

// Formulaire pour l'email
emailForm.addEventListener("input", (event) => {
  if (event.target.value.length == 0) {
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
    emailErrorMsg.innerHTML = "L'email ne respecte pas le bon format (ex: eric.dupont@gmail.com).";
    valueEmail = null;
  }
});

//Envoi du formulaire

let formContact = document.querySelector(".cart__order");

formContact.addEventListener("submit", (event) => {
  event.preventDefault();

  if (valueFirstName && valueLastName && valueAddress && valueCity && valueEmail) {
    const finalOrder = JSON.parse(localStorage.getItem("product"));
    let orderId = [];

    finalOrder.forEach((order) => {
      orderId.push(order.id);
    });

    // Données attendues par le controller
    const data = {
      contact: {
        firstName: valueFirstName,
        lastName: valueLastName,
        address: valueAddress,
        city: valueCity,
        email: valueEmail,
      },
      products: orderId,
    };


    // Fetch post
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(data => {
        // Ajoute le duo clé-valeur à l'emplacemement de stockage
        localStorage.setItem(`orderId`, data.orderId);
        document.location.href = `confirmation.html?id=` + data.orderId;
        localStorage.removeItem("product");
      });

    //Vide les informations du formulaire pour éviter les erreurs
    firstNameForm.value = "";
    lastNameForm.value = "";
    addressForm.value = "";
    cityForm.value = "";
    emailForm.value = "";
    valueFirstName = null;
    valueLastName = null;
    valueAddress = null;
    valueCity = null;
    valueEmail = null;

  } else {
    alert("Veuillez vérifier le formulaire.")
  }
});

console.log(buyProducts);