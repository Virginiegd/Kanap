/**Récupération des données envoyées lors de la commande sur la page cart.js
 * Et affichage de l'orderId
*/
function orderDisplay(){
    const orderFinal = document.getElementById("orderId");
    orderFinal.innerHTML = localStorage.getItem('orderId');
};

orderDisplay();

// Efface le numéro de commande du localStorage
localStorage.removeItem("orderId"); 