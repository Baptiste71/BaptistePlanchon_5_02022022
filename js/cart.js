const cartFull = document.getElementById("cart__items");

// Recuperation des données du localStorage

let cartLocalStorage = localStorage.getItem("cart");
let newProductinCart = JSON.parse(localStorage.getItem("cart"));
console.log(cartLocalStorage);

// Génération du Html pour chaque produit ajoutés

if (cartLocalStorage === null) {
  console.log("je suis vide");
} else {
  let productsInCart = `<article class="cart__item" data-id=${cartLocalStorage.id} data-color="${cartLocalStorage.color}">
                          <div class="cart__item__img">
                            <img src="" alt="Photographie d'un canapé">
                          </div>
                          <div class="cart__item__content">
                            <div class="cart__item__content__description">
                              <h2>${cartLocalStorage.name}</h2>
                              <p>${cartLocalStorage.color}</p>
                              <p>${cartLocalStorage.price * cartLocalStorage.quantity}</p>
                            </div>
                            <div class="cart__item__content__settings">
                              <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartLocalStorage.quantity}">
                              </div>
                              <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                              </div>
                            </div>
                          </div>
                        </article>`;

  cartFull.insertAdjacentHTML("afterbegin", productsInCart);
}
