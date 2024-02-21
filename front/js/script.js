//Get the existing section element on the page where the cards will be inserted
const sectionElement = document.getElementById("items");

/**
 * Get the product array from the backend API
 * 
 */
fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        console.log(products);
        insertProducts(products);
    });

/**
 * Iterate over product array from backend API
 * 
 * @param {object} products - Product array
 */
function insertProducts(products) {
    for (let product of products) {
        console.log(product);
        //Insert product html on page
        insertProduct(product);
    }
}

/**
 * Insert product html on page
 * 
 * @param {object} product - Product information
 */
function insertProduct(product) {
    //Create a new DOM element to be inserted into the homepage
    const productElement = document.createElement("a");
    productElement.setAttribute("href", `./product.html?id=${product._id}`);
    productElement.innerHTML =
        `<article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`
    //Append as a child the new DOM element into the existing section (parent) element on homepage
    sectionElement.appendChild(productElement);
}