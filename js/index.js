const productsSection = document.getElementById("items");

allProducts();

function allProducts() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(function (values) {
      let productsHtml = "";
      for (let value of values) {
        productsHtml += `
                    <a href="./html/product.html?id=${value._id}">
                        <article>
                        <img src=${value.imageUrl} alt=${value.altTxt}>
                        <h3 class="productName">${value.name}</h3>
                        <p class="productDescription">${value.description}</p>
                        </article>
                    </a>
                    `;
      }
      productsSection.insertAdjacentHTML("afterbegin", productsHtml);
    })
    .catch(function (err) {
      console.error(err);
    });
}
