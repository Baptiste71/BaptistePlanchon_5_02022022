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
                              <p>${value.price * productInLocalStorage.quantity}</p>                     
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
