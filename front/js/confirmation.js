/**Récupération des données envoyées lors de la commande sur la page cart.js
 * Et affichage de l'orderId
*/
function orderDisplay(){
    const orderFinal = document.getElementById("orderId");
    orderFinal.innerHTML = localStorage.getItem('orderId');
};

orderDisplay();

localStorage.removeItem("orderId"); // on efface le numéro de commande du localstorage*/
