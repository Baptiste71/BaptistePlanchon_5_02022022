const imagesProduct = document.querySelector(".item__img");
const nameProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const linkProduct = '<a href="./html/product.html?id=${value._id}">';

// Ecoute de l'événement selectionnant un produit en particulier

let link = new URLSearchParams(document.location.search);
let id = link.get("id");
const addToCart = document.getElementById("addToCart");

addToCart.addEventListener("click", (event) => {
  const colorChoice = document.getElementById("colors");
  const quantity = document.getElementById("quantity");
  // ajouter la couleur et la quantity <=100
  if (quantity.value > 0) {
    let cartLocalStorage = localStorage.getItem("cart");
    if (cartLocalStorage) {
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

// Creer la requête GET / {id} pour récupérer les infos du produit séléctionné

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
      let productColorsHtml = `<option value="1">${value.colors[0]}</option><option value="2">${value.colors[1]}</option> 
                               <option value="3">${value.colors[2]}</option><option value="4">${value.colors[3]}</option>`; // faire un for a la place

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

// Validation du choix de couleur et de quantité
