// Ecoute de la selection faite dans la page product

let cart = new URLSearchParams(document.location.search);
let id = cart.get("id");

const button = (event) => {
  if (event.target.nodeName === `<a href="./html/cart.html?id=${value._id}">`) {
    console.log(event.target.id);
  }
};

window.addEventListener("click", button);
