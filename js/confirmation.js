const numberOfOrder = document.getElementById("orderId");

let shopperOrder = JSON.parse(localStorage.getItem("orderId"));

console.log(shopperOrder);

orderConfirmation();

function orderConfirmation() {
  let orderIdNumberHTML = `<span id="orderId">${shopperOrder.orderId}</span>`;

  numberOfOrder.insertAdjacentHTML(`afterbegin`, orderIdNumberHTML);
}

localStorage.clear();
