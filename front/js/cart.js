//Get product ID and color from URL query parameters
const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get("id");
const selectedColor = document.getElementById("colors");
const selectedQuantity = parseInt(document.getElementById("quantity").value);

// //Fetch product details from backend API
// fetch(`http://localhost:3000/api/products/${productId}`)
//     .then(data => {
//         return data.json();
//     })
//     .then(product => {
//         console.log(product);
//         insertProductDetails(product);

//         //Add product to cart
//         const itemToAddToCart = {
//             productId: product._id,
//             name: product.name,
//             price: product.price,
//             color: selectedColor,
//             quantity: selectedQuantity,
//             imageUrl: product.imageUrl,
//             altTxt: product.altTxt
//         }

//         //Push the item to the cart array
//         cart.push(itemToAddToCart);

//         //Save updated cart to local storage
//         localStorage.setItem("cart", JSON.stringify(cart));
//     })


//Get cart data from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

//Get the cart container element
const cartItemsContainer = document.getElementById("cart__items");

//Clear any existing content in the cart container
cartItemsContainer.innerHTML = "";

//Go through items in the cart and create HTML elements for each
cart.forEach(item => {
    //Create new DOM elements for the cart item
    const cartItemElement = document.createElement("article");
    cartItemElement.classList.add("cart__item");
    cartItemElement.dataset.id = item.productId;
    cartItemElement.dataset.color = item.color;

    //Build dynamic HTML for the cart item
    cartItemElement.innerHTML =
        `<div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${item.price}</p>
            </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Quantity : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                    </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                </div>
            </div>
        </div>`;

    //Insert the cart item element into the cart page by appending to cart container
    cartItemsContainer.appendChild(cartItemElement);
})

//Use event listener for quantity change
cartItemsContainer.addEventListener("change", event => {
    if (event.target.classList.contains("itemQuanity")) {
        const productId = event.target.closest(".cart__item").dataset.id;
        const color = event.target.closest(".cart__item").dataset.color;
        const newQuantity = parseInt(event.target.value);

        //Update cart data with new quanity
        const cartIndex = cart.findIndex(item => item.productId === productId && item.color === color);
        if (cartIndex !== -1) {
            cart[cartIndex].quantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
});

//Use event listener for item deletion
cartItemsContainer.addEventListener("click", event => {
    if (event.target.classList.contains("deleteItem")) {
        const productId = event.target.closest(".cart__item").dataset.id;
        const color = event.target.closest(".cart__item").dataset.color;

        //Remove item from cart data
        const updatedCart = cart.filter(item => !(item.productId === productId && item.color === color));
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        //Remove item from DOM
        event.target.closest(".cart__item").remove();
    }
});

//Function to display error message
function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = "block";
}

//Function to hide error message
function hideErrorMessage() {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.style.display = "none";
}

//Use event listener for form submission
orderForm.addEventListener("submit", event => {
    event.preventDefault(); //Prevent form submission

    //Get user input values from form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    //Basic validation for blank fields
    if (!firstName || !lastName || !address || !city || !email) {
        displayErrorMessage("Please fill out all fields.");
        return;
    }

    //Validate email user input using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailErrorMsg").textContent = "Invalid email address";
        return;
    }

    //If all validation pass, hide error message and move to order confirmation
    hideErrorMessage();

    //Create a contact object
    const contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };

    //Send order data to the API using a POST request
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ contact: contact, products: cart })
    })
        .then(response => response.json())
        .then(order => {
            window.location.href = `confirmation.html?orderId=${order.orderId}`;
        });
});