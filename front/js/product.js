const url = new URL(window.location.href);
const id = url.searchParams.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        console.log(product);
        insertProductDetails(product);
    });

/**
 * Insert product details in page
 * 
 * @param {object} product - product info
 */
function insertProductDetails(product) {
    const itemImage = document.querySelector('.item .item__img');
    const itemName = document.querySelector('.item #title');
    const itemPrice = document.querySelector('.item #price');
    const itemDescription = document.querySelector('.item #description');
    const itemColor = document.querySelector('.item #colors');

    const img = document.createElement("img"); 
    img.setAttribute("src", product.imageUrl); 
    img.setAttribute("alt", product.altTxt);
    itemImage.append(img);

    itemName.textContent = product.name;
    itemPrice.textContent = product.price;
    itemDescription.textContent = product.description;
    
    product.colors.forEach(color => {
        console.log(color);
        const option = document.createElement("option");
        option.textContent = color;
        itemColor.append(option);
    });
} 




const button = document.getElementById("addToCart");

button.addEventListener("click", () => {
    console.log("I'm clicked!")
    //TODO Find out which one - id, color, qty
    //TODO Get current cart from local storage
    //TODO Add the product to the cart - if it's not already in there (id & color match, only increase in qty)
    //TODO If it is found - increase the qty instead
    //TODO Save updated cart back to local storage
})