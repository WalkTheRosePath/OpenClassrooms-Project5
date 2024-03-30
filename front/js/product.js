// Use URL to get product ID
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Get the product array from backend API
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
    
    // Populate dropdown list for color choices
    product.colors.forEach(color => {
        console.log(color);
        const option = document.createElement("option");
        option.textContent = color;
        itemColor.append(option);
    });
}

const button = document.getElementById("addToCart");
/**
 * Use event listener for button click to add product to cart
 * 
 */
button.addEventListener("click", () => {
    console.log("I'm clicked!")
    //Find out which product - id, color, quantity
    const productId = id;
    const selectedColor = document.getElementById("colors").value;
    const selectedQuantity = parseInt(document.getElementById("quantity").value);

    //Handle invalid input
    if (!selectedColor || selectedQuantity <= 0) {
        alert("Please select a color and quantity before adding to cart.");
        return;
    }

    //Get current cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    //Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.productId === productId && item.color === selectedColor);

    //If product and color is found, increase the quantity instead
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += selectedQuantity;
    } else {   //If product and color doesn't exist in cart, add new entry
        cart.push({   //(Note: In future consider updating array with .map method instead of .push for better use with frameworks)
            productId: productId,
            color: selectedColor,
            quantity: selectedQuantity
        });
    }
           
    //Save updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    //Provide feedback to user
    alert("Product added to cart.");
});