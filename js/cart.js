const cartFull = document.getElementById("cart__items");
const totalArticleInCart = document.getElementById("totalQuantity");
const totalPriceOfArticle = document.getElementById("totalPrice");
const rules = /^[a-zA-Z-\s]+$/;

// Recuperation des données du localStorage

let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

console.log(cartLocalStorage);
startUp();

// Génération du Html pour chaque produit ajoutés
async function startUp() {
  if (cartLocalStorage === null) {
    console.log("je suis vide");
  } else {
    let productsInCart = "";
    for await (let productInLocalStorage of cartLocalStorage) {
      const res = await fetch(`http://localhost:3000/api/products/${productInLocalStorage.id}`);
      if (res.ok) {
        const resJson = await res.json();
        productsInCart += `<article class="cart__item" data-id=${productInLocalStorage.id} data-color="${productInLocalStorage.color}">
                          <div class="cart__item__img">
                            <img src="${resJson.imageUrl}" alt="${resJson.altTxt}">
                          </div>
                          <div class="cart__item__content">
                            <div class="cart__item__content__description">
                              <h2>${resJson.name}</h2>
                              <p>${productInLocalStorage.color}</p>
                              <p>${resJson.price}€</p>                     
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
      }
    }
    cartFull.insertAdjacentHTML("afterbegin", productsInCart);

    // modification de la quantité dans la page panier
    addArticleOnLocalStorage();
    function addArticleOnLocalStorage() {
      const addArticleInCart = document.querySelectorAll(".cart__item__content__settings__quantity");

      addArticleInCart.forEach((elem) => {
        elem.addEventListener("change", (event) => {
          let canapFinded = event.target.closest("article");

          if (cartLocalStorage) {
            let indexFind;

            indexFind = cartLocalStorage.findIndex((savedProduct) => {
              return savedProduct.id === canapFinded.getAttribute("data-id") && savedProduct.color === canapFinded.getAttribute("data-color");
            });

            if (parseInt(event.target.value) > 0 && parseInt(event.target.value) <= 100) {
              cartLocalStorage[indexFind].quantity = parseInt(event.target.value);
              localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
            }
            if (elem) {
              totalQuantityInLocalStorage();
              totalPriceOnBill();
            }
          }
        });
      });
    }

    // Suppression d'élément dans le panier
    deleteArticleOnLocalStorage();

    function deleteArticleOnLocalStorage() {
      const deleteProduct = document.querySelectorAll(".deleteItem");

      deleteProduct.forEach((elem) => {
        elem.addEventListener("click", (event) => {
          let canapFinded = event.target.closest("article");

          if (cartLocalStorage) {
            let indexFind;

            indexFind = cartLocalStorage.findIndex((savedProduct) => {
              return savedProduct.id === canapFinded.getAttribute("data-id") && savedProduct.color === canapFinded.getAttribute("data-color");
            });

            cartLocalStorage.splice(indexFind, 1);
            canapFinded.remove();
            localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
          }
        });
      });
    }

    // Total des articles dans le panier
    totalQuantityInLocalStorage();

    function totalQuantityInLocalStorage() {
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
      document.getElementById("totalQuantity").innerHTML = `${totalArticle}`;
      console.log(document.getElementById("totalQuantity").innerHTML);
    }

    // Total du prix dans le panier

    totalPriceOnBill();

    async function totalPriceOnBill() {
      let totalPrice = [];
      for await (let productInLocalStorage of cartLocalStorage) {
        const res = await fetch(`http://localhost:3000/api/products/${productInLocalStorage.id}`);
        if (res.ok) {
          const resJson = await res.json();

          for (let article = 0; cartLocalStorage.length; article++) break;
          {
            let totalPriceOfCart = resJson.price * productInLocalStorage.quantity;
            totalPrice.push(totalPriceOfCart);
            console.log(totalPrice);
          }
        }
      }
      const reducer = (addition, currentValue) => addition + currentValue;
      const totalArticle = totalPrice.reduce(reducer, 0);
      console.log(totalArticle);
      const totalPriceHTML = `<span id="totalPrice">${totalArticle}</span>`;
      totalPriceOfArticle.insertAdjacentHTML("afterbegin", totalPriceHTML);
      document.getElementById("totalPrice").innerHTML = `${totalArticle}`;
      console.log(document.getElementById("totalPrice").innerHTML);
    }
  }

  // Confirmation du formulaire

  formShopper();

  function formShopper() {
    const setForm = document.querySelector(".cart__order__form");
    const firstName = document.getElementById("firstName").value === "".rules;
    const errorFirstName = document.getElementById("firstNameErrorMsg");
    const lastName = document.getElementById("lastName").value === "".rules;
    const errorLastName = document.getElementById("lastNameErrorMsg");
    const address = document.getElementById("address").value === "";
    const errorAddress = document.getElementById("addressErrorMsg");
    const city = document.getElementById("city").value === "";
    const errorCity = document.getElementById("cityErrorMsg");
    const email = document.getElementById("email").value === "";
    const errorEmail = document.getElementById("emailErrorMsg");

    setForm.addEventListener("submit", (event) => {
      if (firstName.value || lastName.value || address.value || city.value || email.value == "") {
        errorFirstName.innerHTML = "Merci de renseigner ce champ !";
        errorLastName.innerHTML = "Merci de renseigner ce champ !";
        errorAddress.innerHTML = "Merci de renseigner ce champ !";
        errorCity.innerHTML = "Merci de renseigner ce champ !";
        errorEmail.innerHTML = "Merci de renseigner ce champ par une adresse mail valide !";

        event.preventDefault();
      } else if (rules.test(firstName.value || lastName.value || address.value || city.value || email.value) == false) {
        errorFirstName.innerHTML = "Merci de renseigner ce champ !";
        errorLastName.innerHTML = "Merci de renseigner ce champ !";
        errorAddress.innerHTML = "Merci de renseigner ce champ !";
        errorCity.innerHTML = "Merci de renseigner ce champ !";
        errorEmail.innerHTML = "Merci de renseigner ce champ par une adresse mail valide !";

        event.preventDefault();
      }
      const order = [];
      order.push(cartLocalStorage);
      console.log(order);

      const info = {};
    });
  }
}
