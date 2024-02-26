//Get the existing <section> html element on the homepage where the product cards will be inserted
const sectionElement = document.getElementById("items");

/**
 * Get the product array from the backend API
 * 
 */
fetch(`http://localhost:3000/api/products`)
    .then(data => {
        return data.json();
    })
    .then(products => {
        console.log(products);
        insertProducts(products);
    });

/**
 * Iterate over product array that came from backend API
 * 
 * @param {object} products - Product array
 */
function insertProducts(products) {
    for (let product of products) {
        console.log(product); //Display product info in console
        insertProduct(product); //Insert product html onto page
    }
}

/**
 * Insert product html on page
 * 
 * @param {object} product - Product information
 */
function insertProduct(product) {
    //Create a new DOM element to be inserted into the homepage
    const productElement = document.createElement("a"); //Create a new anchor tag to hold the product info for each clickable card
    productElement.setAttribute("href", `./product.html?id=${product._id}`); //Link the anchor tag to the product page (with selected product id attached)
    productElement.innerHTML =
        `<article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`
    //Append (as a child) the new DOM element into the existing (parent) section element on the homepage
    sectionElement.appendChild(productElement);
}

