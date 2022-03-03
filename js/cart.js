const cartFull = document.getElementById("cart__items");

// Recuperation des données du localStorage

let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

console.log(cartLocalStorage);

// Génération du Html pour chaque produit ajoutés

if (cartLocalStorage === null) {
  console.log("je suis vide");
} else {
  for (let productInLocalStorage of cartLocalStorage) {
    fetch(`http://localhost:3000/api/products/${productInLocalStorage.id}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then(function (value) {
        let productsInCart = `<article class="cart__item" data-id=${value.id} data-color="${value.color}">
                          <div class="cart__item__img">
                            <img src="${value.imageUrl}" alt="${value.altTxt}">
                          </div>
                          <div class="cart__item__content">
                            <div class="cart__item__content__description">
                              <h2>${value.name}</h2>
                              <p>${productInLocalStorage.color}</p>
                              <p>${value.price * productInLocalStorage.quantity}€</p>                     
                            </div>
                              <div class="cart__item__content__settings">
                              <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage.quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                              </div>
                            </div>
                          </div>
                        </article>`;

        cartFull.insertAdjacentHTML("afterbegin", productsInCart);
      });
  }
}

// Prise en compte de la modification de la quantité sur la page Panier

const quantityValueInInput = document.querySelector(".cart__item__content__settings__quantity");
const quantityChoice = document.querySelector(".itemQuantity");
let inputValue = cartLocalStorage;

if (inputValue) {
  let indexFind = false;
  for (let [index, productInCart] of inputValue.entries()) {
    if (productInCart.quantity != quantityChoice) {
      indexFind = true;

      if (inputValue[index].quantity + parseInt(quantityChoice) <= 100) {
        inputValue[index].quantity += parseInt(quantityChoice);
      }
      if (indexFind) {
        localStorage.setItem(".cart__item__content__settings__quantity", JSON.stringify(inputValue));
      } else {
        inputValue.push(quantityChoice);
        localStorage.setItem(".cart__item__content__settings__quantity", JSON.stringify(inputValue));
      }
    }
  }
}

// Suppression d'élément dans le panier

let deleteItem = document.querySelectorAll(".deleteItem");
console.log(deleteItem);

for (let deleteItemInCart = [cartLocalStorage]; deleteItemInCart < [deleteItem.length]; deleteItemInCart++) {
  deleteItem[deleteItemInCart].addEventListener("click", (events) => {
    events.preventDefault();

    let deleteItemId = cartLocalStorage[deleteItemInCart].idSelectProduct;
    console.log();

    cartLocalStorage = cartLocalStorage.filter((el) => el.idSelectProduct !== deleteItemId);
    console.log(cartLocalStorage);
  });
}
