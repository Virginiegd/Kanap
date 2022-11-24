const addProduct = JSON.parse(localStorage.getItem("product")); //transforme les chaînes de caractère en tableau

console.log(addProduct);


const cartContainer = document.querySelector("#cart__items");




  if (addProduct === null || addProduct == 0) {
    const cartEmpty =
      `<article class="container-cart-empty">
      <div> Le panier est vide</div> </article>`;

    cartContainer.innerHTML = cartEmpty;

  } else {


    let cartFull = [];  
    

    for (j = 0; j < addProduct.length; j++) {

      fetch(`http://localhost:3000/api/products/${addProduct[j].id}`)
    .then(r => r.json())
    .then((addProduct) => displayKanap(addProduct))
    .catch();

    
      

      cartFull = cartFull + `
      <article class="cart__item" data-id="¤${addProduct[j].id}" data-color="${addProduct[j].color}">
                <div class="cart__item__img">
                <img src="${addProduct[j].src}" alt="${addProduct[j].alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${addProduct[j].name}</h2>              
                    <p>${addProduct[j].color}</p>
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
    } 
  }

  function displayKanap(addProduct) {
    let price = document.querySelector("p");
    let priceProduct = document.createElement("p");
    priceProduct.innerHTML = `${addProduct.price} €`;
    price.appendChild(priceProduct); 
}


/*    fetch("http://localhost:3000/api/products/")
    .then(r => r.json())
    .then((addProduct) => displayKanap(addProduct))
    .catch(); */

/*  function displayKanap(addProduct) {
    for (const product of addProduct) {
    let price = document.querySelector("p");
    let priceProduct = document.createElement("p");
    priceProduct.innerHTML = `${product.price} €`;
    price.appendChild(priceProduct); 
  }
}*/




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