//Get the existing element on the page where I can insert the cards 
const sectionElement = document.getElementById("items");

//Get the array from the backend API
fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(products => {
        console.log(products);
        insertProducts(products);
    });

//Iterate over the array that I got from the backend
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

    //Append (child) new DOM element into existing section tag element on page
    sectionElement.appendChild(productElement);
}