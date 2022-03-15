let link = new URLSearchParams(document.location.search);
let id = link.get("id");

orderConfirmation();

function orderConfirmation() {
  const numberOfOrder = document.getElementById("orderId");

  let orderIdNumberHTML = `<span id="orderId">${id}</span>`;

  numberOfOrder.insertAdjacentHTML(`afterbegin`, orderIdNumberHTML);
}
