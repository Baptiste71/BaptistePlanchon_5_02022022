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
            for (let [index, productInCart] of cartLocalStorage.entries()) {
              if (productInCart.quantity === [index, productInLocalStorage.quantity] && productInCart.id === productInLocalStorage.id) break;
              {
                indexFind = true;

                if ([productInLocalStorage.quantity] > parseInt(articleQuantity.value) <= 100 || [productInLocalStorage.quantity] < parseInt(articleQuantity.value) <= 100) {
                  [productInLocalStorage.quantity] === parseInt(articleQuantity.value);
                }
              }
            }
            if (indexFind) {
              localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            }
          }
        });

        // Suppression d'élément dans le panier

        const deleteItem = document.querySelector(".deleteItem");

        deleteItem.addEventListener("click", (event) => {
          let condition = true;
          if (productInLocalStorage === [productInLocalStorage]) {
            condition = true;
          }
          if (condition) {
            JSON.stringify(localStorage.removeItem("cart"));
          }
        });

        // Totaux des prix et articles dans le panier

        let totalQuantity = [];

        for (let article = 0; article < cartLocalStorage.length; article++) {
          let quantityOfArticleInCart = cartLocalStorage[article].quantity;

          totalQuantity.push(quantityOfArticleInCart);
          console.log(totalQuantity);
        }

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalArticle = totalQuantity.reduce(reducer, 0);
        console.log(totalArticle);

        const totalQuantityHTML = `<span id="totalQuantity">${totalArticle}</span>`;
        totalArticleInCart.insertAdjacentHTML("afterbegin", totalQuantityHTML);
      });
  }
}
