let saveProductLocalStorage = JSON.parse(localStorage.getItem("product")); // transforme les chaînes de caractère en tableau
console.log(saveProductLocalStorage);

let product = [];

const cartContainer = document.querySelector("#cart__items");

  function displayCart() {

    if (saveProductLocalStorage === null) {
      const cartEmpty =
      `<article class="container-cart-empty">
        <div> Le panier est vide</div> </article>`;

    cartContainer.innerHTML = cartEmpty;

     } else {
      for( j = 0; j < saveProductLocalStorage.length; j ++){
          
        console.log(saveProductLocalStorage[j]);
        
      
      fetch(`http://localhost:3000/api/products/${saveProductLocalStorage[j].id}`)
        .then(r => r.json())
        .then((product) => displayCart(product))
        .catch();
     //   product.push(saveProductLocalStorage[j]);
    // product.push(saveProductLocalStorage[j].id);
        function displayCart(product) {
        
     //    saveProductLocalStorage.push(product);
      
          
          let cartContainer = document.querySelector("#cart__items");
         //cartContainer.innerHTML = `<article class="cart__item" data-id="${saveProductLocalStorage[j].id}" data-color="${saveProductLocalStorage[j].color}"></article>`;
         let articleElement = document.createElement("article");
         articleElement.setAttribute("class", "cart__item");
          cartContainer.appendChild(articleElement);
          let divElement = document.createElement("div");
          divElement.setAttribute("class", "cart__item__img")
          articleElement.appendChild(divElement);
          let imageProduct = document.createElement("img");
          imageProduct.src = product.imageUrl;
          imageProduct.alt = product.altTxt;
          divElement.appendChild(imageProduct);
          let divElement1 = document.createElement("div");
          divElement1.setAttribute("class","cart__item__content" )
          articleElement.appendChild(divElement1);
          let divElement2 = document.createElement("div");
          divElement2.setAttribute("class", "cart__item__content__description");
          divElement1.appendChild(divElement2);
          nameProduct = document.createElement("h2");
          nameProduct.innerHTML = product.name
          divElement2.appendChild(nameProduct);
          colorProduct = document.createElement("p");
          colorProduct.innerHTML =product.color;
          divElement2.appendChild(colorProduct);
          priceProduct = document.createElement("p");
          priceProduct.innerHTML =  `${product.price} €`;
          divElement2.appendChild(priceProduct);
          let divElement3 = document.createElement("div");
          divElement3.setAttribute("class","cart__item__content__settings");
          divElement1.appendChild(divElement3)
          let divElement4 = document.createElement("div");
          divElement4.setAttribute("class", "cart__item__content__settings__quantity");
          divElement3.appendChild(divElement4)
          let paragrapheElement = document.createElement("p");
          paragrapheElement.innerHTML = `<p>Qté : </p>`;
          divElement3.appendChild(divElement4);
          divElement4.appendChild(paragrapheElement);
          let inputElement = document.createElement("input");
          inputElement.innerHTML = ` <input type="number" class="itemQuantity" name="itemQuantity" 
          min="1" max="100" value="${product.quantity}"></input>`;
          divElement4.appendChild(inputElement);
          divElement5 = document.createElement("div");
          divElement5.setAttribute("class", "cart__item__content__settings__delete");
          paragrapheElement1 = document.createElement("p");
          paragrapheElement1.innerHTML = `<p class="deleteItem">Supprimer</p>`;
          divElement3.appendChild(divElement5);
          divElement5.appendChild(paragrapheElement1);
        } 
      } 
   }  
} 
  displayCart();
     