// Récupération de l'url
const url = window.location.search;

//Extraction de l'id
const params = new URLSearchParams(url);
const _id = params.get("_id");
//console.log(_id);

fetch("http://localhost:3000/api/products/" + _id) // récupère directement la key _id dans la requête fetch
    .then(r => r.json())
    .then((product) => displayProduct(product))
    .catch(error => console.log("Impossible de charger la page !"));

// Affiche les éléments correspondant au produit sélectionné    
function displayProduct(product) {
    let pictureElement = document.querySelector(".item__img"); //la méthode querySelector() retourne le premier élément dans le document correspondant au sélecteur
    let imageProduct = document.createElement("img");
    imageProduct.src = product.imageUrl;
    imageProduct.alt = product.altTxt;
    pictureElement.appendChild(imageProduct);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = product.description;
    let nameElement = document.querySelector("#title");
    nameElement.innerHTML = product.name;
    let priceElement = document.querySelector("#price");
    priceElement.innerHTML = product.price;

    // Création de la boucle pour le choix des couleurs
    let selectColor = document.getElementById("colors");

    product.colors.forEach(choiceColor => {
        let optionColor = document.createElement("option");
        selectColor.appendChild(optionColor);
        optionColor.value = `${choiceColor}`;
        optionColor.innerText = `${choiceColor}`;
    });

    // Ecoute du bouton "Ajouter au panier"
    const listenToCart = document.getElementById("addToCart");
    //console.log(listenToCart);
    listenToCart.addEventListener("click", (event) => {
        event.preventDefault(); // empêche la page de se réactualiser au click sur le bouton

        //Récupération des options sélectionnées par le client et envoi du panier
        const selectColor = document.getElementById("colors");
        const idQuantity = document.querySelector("#quantity");

        //Récupération des éléments à enregistrer dans le panier
        let selection = {
            id: _id,
            color: `${selectColor.value}`,
            quantity: `${idQuantity.value}`,
        };

        // Stocke la récupération des valeurs dans le localstorage
        let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau

        const addProductLocalStorage = () => {
            saveProductLocalStorage.push(selection);
            localStorage.setItem("product", JSON.stringify(saveProductLocalStorage)); // transforme le tableau en chaîne de caractère
        };
        let addConfirm = () => {
            alert('Le produit a bien été ajouté au panier');
        };

        let update = false;

        // Si des produits sont déjà enregistrés dans le localstorage
        if (saveProductLocalStorage) {
            saveProductLocalStorage.forEach(function (product, key) { // la méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
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
        // Si aucun produit n'est enregistré dans le local storage
        else {
            saveProductLocalStorage = []; // crée un tableau vide
            addProductLocalStorage();
            addConfirm();
        }
    });
};
