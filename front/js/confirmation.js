//Récupération des données envoyées lors de la commande sur la page cart.js
const orderFinal = JSON.parse(localStorage.getItem("orderProducts"));

//Affichage du numéro de la commande
const orderDisplay = async () => {
    if(orderFinal) {
     await orderFinal;
        const lastElement = orderFinal[orderFinal.length -1]; // permet de récupérer le dernier élément du tableau
        const numOrder = document.getElementById("orderId");
        numOrder.innerHTML = lastElement.order;
    }   
};
 
localStorage.removeItem("orderProducts"); // on efface le numéro de commande du localstorage
 
orderDisplay();

