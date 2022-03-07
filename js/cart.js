const cartFull = document.getElementById("cart__items");
const totalArticleInCart = document.getElementById("totalQuantity");
const totalPriceOfArticle = document.getElementById("totalPrice");

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
        let productsInCart = `<article class="cart__item" data-id=${productInLocalStorage.id} data-color="${productInLocalStorage.color}">
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

        // modification de la quantité dans la page panier

        const addArticleInCart = document.querySelector(".cart__item__content__settings__quantity");

        addArticleInCart.addEventListener("click", (event) => {
          const articleQuantity = document.querySelector(".itemQuantity");

          if (cartLocalStorage) {
            let indexFind = false;
            let [index, productInCart] = cartLocalStorage.entries();
            if (productInCart.quantity === [index, productInLocalStorage.quantity]);
            {
              indexFind = true;

              if ([productInLocalStorage.quantity] > parseInt([articleQuantity.value]) <= 100 || [productInLocalStorage.quantity] < parseInt([articleQuantity.value]) <= 100) {
                [productInLocalStorage.quantity] === parseInt([articleQuantity.value]);
              }
            }

            if (indexFind) {
              localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            }
          }
        });

        // Suppression d'élément dans le panier

        deleteItemOfCart();

        function deleteItemOfCart() {
          return JSON.stringify(localStorage.removeItem("cart"));
        }

        const deleteItem = document.querySelector(".deleteItem");
        const colorOfProduct = `${productInLocalStorage.color}`;

        deleteItem.addEventListener("click", (event) => {
          if (cartLocalStorage) {
            let indexFind = false;
            for (let [index, productInCart] of cartLocalStorage.entries()) {
              if (productInCart.color === colorOfProduct.value && productInCart.id === id) {
                indexFind = true;

                if (indexFind) {
                  deleteItemOfCart();
                }
              }
            }
          }
        });

        // Total du prix dans le panier

        const articlePrice = document.querySelector(".cart__item__content__description ");

        let priceArticle = [];

        for (let products = 0; products < cartLocalStorage.length; products++) break;
        {
          let totalPrice = articlePrice.lastElementChild.textContent;
          priceArticle.push(totalPrice);
          console.log(totalPrice);
        }

        const calcul = (total, valueCurrent) => total + valueCurrent;
        const totalOnBill = priceArticle.reduce(calcul);
        console.log(totalOnBill);

        const totalPriceHTML = `<span id="totalPrice">${totalOnBill}</span>`;
        totalPriceOfArticle.insertAdjacentHTML("afterbegin", totalPriceHTML);
      });
  }
  // Total des articles dans le panier

  let totalQuantity = [];

  for (let article = 0; article < cartLocalStorage.length; article++) {
    let quantityOfArticleInCart = cartLocalStorage[article].quantity;

    totalQuantity.push(quantityOfArticleInCart);
    console.log(totalQuantity);
  }

  const reducer = (addition, currentValue) => addition + currentValue;
  const totalArticle = totalQuantity.reduce(reducer, 0);
  console.log(totalArticle);

  const totalQuantityHTML = `<span id="totalQuantity">${totalArticle}</span>`;
  totalArticleInCart.insertAdjacentHTML("afterbegin", totalQuantityHTML);
}

// Confirmation du formulaire

const setForm = document.querySelector(".cart__order__form__submit");
const firstName = document.getElementById("firstName").value == "";
const errorFirstName = document.getElementById("firstNameErrorMsg");
const lastName = document.getElementById("lastName").value == "";
const errorLastName = document.getElementById("lastNameErrorMsg");
const address = document.getElementById("address").value == "";
const errorAddress = document.getElementById("addressErrorMsg");
const city = document.getElementById("city").value == "";
const errorCity = document.getElementById("cityErrorMsg");
const email = document.getElementById("email").value == "";
const errorEmail = document.getElementById("emailErrorMsg");

setForm.addEventListener("submit", (event) => {
  if (firstName.value || lastName.value || address.value || city.value || email.value) {
    errorFirstName.innerHTML = "Merci de renseigner ce champ !";
    errorLastName.innerHTML = "Merci de renseigner ce champ !";
    errorAddress.innerHTML = "Merci de renseigner ce champ !";
    errorCity.innerHTML = "Merci de renseigner ce champ !";
    errorEmail.innerHTML = "Merci de renseigner ce champ !";

    event.preventDefault();
  }

  const order = [];
  order.push(cartLocalStorage);

  const buyProduct = {
    productsOrder: order,

    shopperInformation: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
  };
  console.log(buyProduct);
});
