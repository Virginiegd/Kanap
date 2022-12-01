const orderFinal = JSON.parse(localStorage.getItem("orderProducts"));

const orderDisplay = async () => {
    if(orderFinal) {
     await orderFinal;
        const lastElement = orderFinal[orderFinal.length -1];

        const numOrder = document.getElementById("orderId");
        numOrder.innerHTML = lastElement.order;
    }   
};
 localStorage.removeItem("orderProducts");
 orderDisplay();

