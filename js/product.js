const imagesProduct = document.getElementsByClassName("item__img");
const nameProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const linkProduct = '<a href="./html/product.html?id=${value._id}">';

let link = new URLSearchParams(document.location.search);
let id = link.get("id");

const productClick = (event) => {
  if (event.target.nodeName === '<a href="./html/product.html?id=${value._id}">') {
    console.log(event.target.id);
  }
};
window.addEventListener("click", productClick);

product();

function product() {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(function (values) {
      let productImageHtml = "";
      let productNameHtml = "";
      let productPriceHtml = "";
      let productDescriptionHtml = "";
      let productColorsHtml = "";

      productImageHtml = `<img src=${values.imageUrl} alt=${values.altTxt}>`;
      productNameHtml = `<h1 id="title">${values.name}</h1>`;
      productPriceHtml = `<span id="price">${values.price}</span>`;
      productDescriptionHtml = `<p id="description">${values.description}</p>`;
      productColorsHtml = `<option value="">${values.colors}</option><option value="">${values.colors}</option>`;

      //imagesProduct.insertAdjacentHTML(`beforeend`, productImageHtml);
      nameProduct.insertAdjacentHTML(`afterbegin`, productNameHtml);
      priceProduct.insertAdjacentHTML(`afterbegin`, productPriceHtml);
      descriptionProduct.insertAdjacentHTML(`afterbegin`, productDescriptionHtml);
      colorsProduct.insertAdjacentHTML(`afterbegin`, productColorsHtml);
    })

    .catch(function (err) {
      console.error(err);
    });
}
