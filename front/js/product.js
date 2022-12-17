/** Récupération de l'url
 * Extraction de la partie de l'url propre au produit
 * La propriété "searchParams" de "url" nous retourne un objet de type "URLSearchParams"
 * Récupération de l'id du produit dans une variable
 */
const url = window.location.search;
const params = new URLSearchParams(url);
const _id = params.get("_id");

// Récupère directement la key _id dans la requête Fetch
fetch("http://localhost:3000/api/products/" + _id)
    .then(r => r.json())
    .then((product) => displayProduct(product))
    .catch(error => alert("Impossible de charger la page !"));

// Affiche les éléments correspondant au produit sélectionné    
function displayProduct(product) {
    //La méthode querySelector() retourne le premier élément dans le document correspondant au sélecteur
    let pictureElement = document.querySelector(".item__img");
    let imageProduct = document.createElement("img");
    imageProduct.src = product.imageUrl;
    imageProduct.alt = product.altTxt;
    pictureElement.appendChild(imageProduct);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerText = product.description;
    let nameElement = document.querySelector("#title");
    nameElement.innerText = product.name;
    let priceElement = document.querySelector("#price");
    priceElement.innerText = product.price;

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
    listenToCart.addEventListener("click", (event) => {
        event.preventDefault(); // empêche la page de se réactualiser au click sur le bouton

        //Récupération des options sélectionnées par le client
        const selectColor = document.getElementById("colors");
        const idQuantity = document.querySelector("#quantity");

        //Récupération des éléments à enregistrer dans le panier
        let selection = {
            id: _id,
            color: `${selectColor.value}`,
            quantity: `${idQuantity.value}`,
        };

        // Stocke la récupération des valeurs dans le localStorage
        let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau

        let update = false;

        const addProductLocalStorage = () => {
            saveProductLocalStorage.push(selection);
            localStorage.setItem("product", JSON.stringify(saveProductLocalStorage)); // transforme le tableau en chaîne de caractères
        };
        let addConfirm = () => {
            alert('Le produit a bien été ajouté au panier.');
        };

        function watchColorQuantity() {
            /** Vérification de la sélection d'une couleur et de la valeur 
             * de la quantité qui doit
             * être supérieur à 1 et inférieur à 100*/
            if (
                selection.quantity < 1 ||
                selection.quantity > 100 ||
                selection.quantity === undefined ||
                selection.color === "" ||
                selection.color === undefined
            ) {
                alert("Veuillez sélectionnez une couleur et/ou une quantité comprise entre 1 et 100 avant d'ajouter le produit au panier.");
            } else if
                // Si des produits sont déjà enregistrés dans le localStorage avec le même id et la même couleur
                (saveProductLocalStorage) {
                // La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau
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
            // Si aucun produit n'est enregistré dans le localStorage
            else {
                saveProductLocalStorage = []; // crée un tableau vide
                addProductLocalStorage();
                addConfirm();
            }
        };

        watchColorQuantity();

    });
};


