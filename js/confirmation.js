const numberOfOrder = document.getElementById("orderId");

let cartLocalStorage = JSON.parse(localStorage.getItem("orderId"));

console.log(cartLocalStorage);

orderConfirmation();

function orderConfirmation() {
  let orderIdNumberHTML = `<span id="orderId">${cartLocalStorage.value}</span>`;

  numberOfOrder.insertAdjacentHTML(`afterbegin`, orderIdNumberHTML);
}
