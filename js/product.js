const imagesProduct = document.querySelector(".item__img");
const nameProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const linkProduct = '<a href="./html/product.html?id=${value._id}">';

// Creer la requête GET / {id} pour récupérer les infos du produit séléctionné

let link = new URLSearchParams(document.location.search);
let id = link.get("id");

product();

function product() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(function (value) {
      let productImageHtml = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
      let productNameHtml = `<h1 id="title">${value.name}</h1>`;
      let productPriceHtml = `<span id="price">${value.price}</span>`;
      let productDescriptionHtml = `<p id="description">${value.description}</p>`;
      let productColorsHtml = "";
      for (let values of value.colors) {
        productColorsHtml += `<option value="${values}">${(value.colors = [values])}</option>`;
      }

      imagesProduct.insertAdjacentHTML(`beforeend`, productImageHtml);
      nameProduct.insertAdjacentHTML(`afterbegin`, productNameHtml);
      priceProduct.insertAdjacentHTML(`afterbegin`, productPriceHtml);
      descriptionProduct.insertAdjacentHTML(`afterbegin`, productDescriptionHtml);
      colorsProduct.insertAdjacentHTML(`afterbegin`, productColorsHtml);
    })
    .catch(function (err) {
      console.error(err);
    });
}

// Mise en memoire du choix du produit avec sa quantité et sa couleur

const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (event) => {
  const colorChoice = document.getElementById("colors");
  const quantity = document.getElementById("quantity");
  const choice = {
    name: nameProduct,
    price: priceProduct,
    colors: colorsProduct,
  };
  // ajouter la couleur et la quantity <=100
  if (quantity.value > 0 && quantity.value <= 100) {
    let cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage == null) {
      let choices = [];
      choices.push(choice);
      localStorage.setItem("cart", JSON.stringify(choices));

      //parcourir les resultats obtenus
    } else {
      const arrayValue = [
        {
          id: id,
          color: colorChoice.value,
          quantity: parseInt(quantity.value),
        },
      ];
      localStorage.setItem("cart", JSON.stringify(arrayValue));
    }
  }
});
