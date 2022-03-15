const cartFull = document.getElementById("cart__items");
const totalArticleInCart = document.getElementById("totalQuantity");
const totalPriceOfArticle = document.getElementById("totalPrice");

// Recuperation des données du localStorage

let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));

console.log(cartLocalStorage);
startUp();

// Génération du Html pour chaque produit ajoutés
async function startUp() {
  if (cartLocalStorage === null) {
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
          if (elem) {
            totalQuantityInLocalStorage();
            totalPriceOnBill();
          }
        });
      });
    }

    // Calcul du total des articles dans le panier
    totalQuantityInLocalStorage();

    function totalQuantityInLocalStorage() {
      let totalQuantity = [];

      for (let article = 0; article < cartLocalStorage.length; article++) {
        let quantityOfArticleInCart = cartLocalStorage[article].quantity;

        totalQuantity.push(quantityOfArticleInCart);
      }

      const reducer = (addition, currentValue) => addition + currentValue;
      const totalArticle = totalQuantity.reduce(reducer, 0);

      const totalQuantityHTML = `<span id="totalQuantity">${totalArticle}</span>`;
      totalArticleInCart.insertAdjacentHTML("afterbegin", totalQuantityHTML);
      document.getElementById("totalQuantity").textContent = `${totalArticle}`;
    }

    // Calcul total du prix du panier

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
          }
        }
      }
      const reducer = (addition, currentValue) => addition + currentValue;
      const totalArticle = totalPrice.reduce(reducer, 0);
      const totalPriceHTML = `<span id="totalPrice">${totalArticle}</span>`;
      totalPriceOfArticle.insertAdjacentHTML("afterbegin", totalPriceHTML);
      document.getElementById("totalPrice").textContent = `${totalArticle}`;
    }
  }
}
// Confirmation du formulaire

formShopper();

function formShopper() {
  const sendForm = document.getElementById("order");
  let firstName = document.getElementById("firstName");
  let errorFirstName = document.getElementById("firstNameErrorMsg");
  let lastName = document.getElementById("lastName");
  let errorLastName = document.getElementById("lastNameErrorMsg");
  let address = document.getElementById("address");
  let errorAddress = document.getElementById("addressErrorMsg");
  let city = document.getElementById("city");
  let errorCity = document.getElementById("cityErrorMsg");
  let email = document.getElementById("email");
  let errorEmail = document.getElementById("emailErrorMsg");

  function checkFirstName() {
    const validFirstName = firstName.value;
    if (/^[A-Za-z-]{3,30}$/.test(validFirstName)) {
      return true;
    } else {
      errorFirstName.textContent = "Les chiffres et caractères spéciaux ne sont pas autorisés pour ce champ !";
      return false;
    }
  }

  function checkLastName() {
    const validLastName = lastName.value;
    if (/^[A-Za-z-]{3,30}$/.test(validLastName)) {
      return true;
    } else {
      errorLastName.textContent = "Les chiffres et caractères spéciaux ne sont pas autorisés pour ce champ !";
      return false;
    }
  }

  function checkCity() {
    const validCity = city.value;
    if (/^[A-Za-z- ]{3,30}$/.test(validCity)) {
      return true;
    } else {
      errorCity.textContent = "Les chiffres et caractères spéciaux ne sont pas autorisés pour ce champ !";
      return false;
    }
  }

  function checkAddress() {
    const validAddress = address.value;
    if (/^[0-9A-Za-z- ]{3,30}$/.test(validAddress)) {
      return true;
    } else {
      errorAddress.textContent = "Les caractères spéciaux ne sont pas autorisés pour ce champ !";
      return false;
    }
  }
  function checkEmail() {
    const validEmail = email.value;
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
      return true;
    } else {
      errorEmail.textContent = "Les caractères spéciaux comme @ et . sont obligatoire pour ce champ !";
      return false;
    }
  }

  sendForm.addEventListener("click", (event) => {
    event.preventDefault();

    const isFirstNameValid = checkFirstName();
    const isLastNameValid = checkLastName();
    const isCityValid = checkCity();
    const isAddressValid = checkAddress();
    const isEmailValid = checkEmail();

    if (isFirstNameValid && isLastNameValid && isCityValid && isAddressValid && isEmailValid) {
      orderId();
    }
  });

  function orderId() {
    let purchase = [];
    for (let productPurchase of cartLocalStorage) {
      purchase.push(productPurchase.id);
    }

    const shopperInformation = {
      products: purchase,
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
    };

    // Requête POST via Fetch

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(shopperInformation),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((value) => {
        localStorage.clear();
        window.location.href = `../html/confirmation.html?id=${value.orderId}`;
      })
      .catch(function (err) {
        console.error(err);
      });
  }
}
