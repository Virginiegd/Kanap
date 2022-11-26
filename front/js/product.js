// récupération de l'url
const url = window.location.search;

//extraction de l'id
const params = new URLSearchParams(url);
console.log(params);
const _id = params.get("_id");
console.log(_id);

//let productData = [];

fetch("http://localhost:3000/api/products/" + _id) // récupère directement la key _id dans la requête fetch
    .then(r => r.json())
    .then((product) => displayProduct(product))
    .catch(error => console.log("Impossible de charger la page !"));
//error => console.log("Impossible de charger la page !")
// affiche les éléments correspondant au produit sélectionné    
function displayProduct(product) {
    let pictureElement = document.querySelector(".item__img") //La méthode querySelector() retourne le premier élement dans le document correspondant au sélecteur
    let imageProduct = document.createElement("img")
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

    let selectColor = document.getElementById("colors");
    console.log(selectColor);

    console.log(product.colors);

    product.colors.forEach(choiceColor => {
        let optionColor = document.createElement("option");
        selectColor.appendChild(optionColor);
        optionColor.value = `${choiceColor}`;
        optionColor.innerText = `${choiceColor}`;
        console.log(optionColor);   
    });
 //   adtoCart(productData);
  //  };


// ecoute du bouton "Ajouter au panier"
//const adtoCart = () => {
    const listenToCart = document.getElementById("addToCart");
    console.log(listenToCart);
    listenToCart.addEventListener("click", (event) => {
        event.preventDefault();
       

        //récupération des options sélectionnées par le client et envoi du panier
    const selectColor = document.getElementById("colors");
    console.log(selectColor.value);
  // const choiceColor = selectColor.value;
    

    const idQuantity = document.querySelector("#quantity");
  //  const choiceQuantity = idQuantity.value;
   // console.log(idQuantity.value);

      //récupération des éléments à enregistrer dans le panier
      let selection = {
        id: _id,
        color: `${selectColor.value}`,
        quantity: `${idQuantity.value}`,
    };

    console.log(selection);

      // stocke la récupération des valeurs dans le local storage
      let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau


      const addProductLocalStorage = () => {
          saveProductLocalStorage.push(selection);
          localStorage.setItem("product", JSON.stringify(saveProductLocalStorage)); // transforme le tableau en chaîne de caractère
      }
      let addConfirm = () => {
          alert('Le produit a bien été ajouté au panier');
      }
  
      let update = false;
  
      // si des produits sont déjà enregistrés dans le local storage
      if (saveProductLocalStorage) {
          saveProductLocalStorage.forEach(function (product, key) {
              if (product.id == _id && product.color == selectColor.value) { // si des produits sont enregistrés avec ces mêmes clés
                  saveProductLocalStorage[key].quantity = parseInt(product.quantity) + parseInt(idQuantity.value);
                  localStorage.setItem("product", JSON.stringify(saveProductLocalStorage));
                  update = true;
                  addConfirm();
              }
          });
  
          if (!update) {
              addProductLocalStorage();
              addConfirm();
          }
      }
      // si aucun produit n'est enregistré dans le local storage
      else {
          saveProductLocalStorage = []; // crée un tableau vide
          addProductLocalStorage();
          addConfirm();
      }
    
      });
    };


   /* // récupération des options sélectionnées par le client et envoi du panier
    const idColor = document.getElementById("colors");
    const choiceColor = idColor.value;
    console.log(choiceColor);

    const idQuantity = document.querySelector("#quantity");
    const choiceQuantity = idQuantity.value;
    console.log(idQuantity.value);

    //récupération des éléments à enregistrer dans le panier
    let selection = {
        id: _id,
        color: choiceColor,
        quantity: choiceQuantity
    }

    console.log(selection);

    // stocke la récupération des valeurs dans le local storage
    let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau


    const addProductLocalStorage = () => {
        saveProductLocalStorage.push(selection);
        localStorage.setItem("product", JSON.stringify(saveProductLocalStorage)); // transforme le tableau en chaîne de caractère
    }
    let addConfirm = () => {
        alert('Le produit a bien été ajouté au panier');
    }

    let update = false;

    // si des produits sont déjà enregistrés dans le local storage
    if (saveProductLocalStorage) {
        saveProductLocalStorage.forEach(function (product, key) {
            if (product.id == _id && product.color == choiceColor) { // si des produits sont enregistrés avec ces mêmes clés
                saveProductLocalStorage[key].quantity = parseInt(product.quantity) + parseInt(choiceQuantity);
                localStorage.setItem("product", JSON.stringify(saveProductLocalStorage));
                update = true;
                addConfirm();
            }
        });

        if (!update) {
            addProductLocalStorage();
            addConfirm();
        }
    }
    // si aucun produit n'est enregistré dans le local storage
    else {
        saveProductLocalStorage = []; // crée un tableau vide
        addProductLocalStorage();
        addConfirm();
    }*/


    //console.table("product =", product);
    /*  for (let i in product.colors) { //on reprend la valeur de la fonction précédente et on la rattache à .colors
          let optionColor = document.createElement("option");
               optionColor.setAttribute("value", product.colors[i]); //Element.setAttribute(name, value); (Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié. Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.)
               optionColor.innerHTML = product.colors[i];
               let selectColor = document.getElementById("colors");
               selectColor.appendChild(optionColor);
              }/*
  
/*  let selectColor = document.querySelector("#colors");

  selectColor.forEach (choiceColor => {
      const color = document.getElementById("colors");
      let optionColor = document.createElement("option");
      color.appendChild(optionColor);
      optionColor.value = choiceColor;
      optionColor.innerText = choiceColor;
  })*/

  /*  const optionColors = product.colors;
    console.log(optionColors);

    for (let i = 0; i < optionColors.length; i++) {
        let optionColor = document.createElement("option");
        optionColor.setAttribute("value", product.colors[i]); //Element.setAttribute(name, value); (Ajoute un nouvel attribut ou change la valeur d'un attribut existant pour l'élément spécifié. Si l'attribut existe déjà, la valeur est mise à jour ; sinon, un nouvel attribut est ajouté avec le nom et la valeur spécifiés.)
        optionColor.innerHTML = product.colors[i];
        let selectColor = document.getElementById("colors");
        selectColor.appendChild(optionColor);
    }*/