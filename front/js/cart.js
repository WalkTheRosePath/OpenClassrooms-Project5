// Fetch product details from backend API
async function getProduct(productId) {
    const data = await fetch(`http://localhost:3000/api/products/${productId}`);
    return data.json();
};

// Get cart data from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get the cart container element
const cartItemsContainer = document.getElementById("cart__items");

// Clear any existing content in the cart container
cartItemsContainer.innerHTML = "";

// Set default price and quantity to zero
let totalPrice = 0;
let totalQuantity = 0;

// Go through items in the cart and create HTML elements for each
cart.forEach(async item => {
    const product = await getProduct(item.productId);
    console.log(product);

    // Create new DOM elements for the cart item
    const cartItemElement = document.createElement("article");
    cartItemElement.classList.add("cart__item");
    cartItemElement.dataset.id = item.productId;
    cartItemElement.dataset.color = item.color;

    // Build dynamic HTML for the cart item
    cartItemElement.innerHTML =
        `<div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${item.color}</p>
                <p>€${product.price}</p>
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

    // Insert the cart item element into the cart page by appending to cart container
    cartItemsContainer.appendChild(cartItemElement);

    // Update total quantity and price to display
    totalQuantity += item.quantity;
    totalPrice += item.quantity * product.price;
    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText = totalPrice;
});

// Use event listener for quantity change
cartItemsContainer.addEventListener("change", event => {
    if (event.target.classList.contains("itemQuantity")) {
        console.log("changing");
        // Get latest cart from local storage
        const latestCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Extract necessary info from the event and the DOM
        const productId = event.target.closest(".cart__item").dataset.id;
        const color = event.target.closest(".cart__item").dataset.color;
        const newQuantity = parseInt(event.target.value);

        // Update the quantity of the corresponding item in the latest cart
        const cartIndex = latestCart.findIndex(item => item.productId === productId && item.color === color);
        if (cartIndex !== -1) {
            latestCart[cartIndex].quantity = newQuantity;
            console.log(latestCart);

            // Update local storage with the updated cart data
            localStorage.setItem("cart", JSON.stringify(latestCart));

            // Recalculate total quantity and total price based on updated cart
            let updatedTotalQuantity = 0;
            let updatedTotalPrice = 0;
            latestCart.forEach(item => {
                updatedTotalQuantity += item.quantity;
                updatedTotalPrice += item.quantity * item.price;
            });

            // Update the total quantity and price elements on the page
            document.getElementById("totalQuantity").innerText = updatedTotalQuantity;
            document.getElementById("totalPrice").innerText = updatedTotalPrice;
        }
    }
});

// Use event listener for item deletion
cartItemsContainer.addEventListener("click", event => {
    if (event.target.classList.contains("deleteItem")) {
        //Get latest cart from local storage 
        const latestCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productId = event.target.closest(".cart__item").dataset.id;
        const color = event.target.closest(".cart__item").dataset.color;

        // Remove item from cart data
        const updatedCart = latestCart.filter(item => !(item.productId === productId && item.color === color));
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Remove item from DOM
        event.target.closest(".cart__item").remove();

        // Recalculate total quantity and total price based on updated cart
        let updatedTotalQuantity = 0;
        let updatedTotalPrice = 0;
        updatedCart.forEach(item => {
            updatedTotalQuantity += item.quantity;
            updatedTotalPrice += item.quantity * item.price;
        });

        // Update the total quantity and price elements on the page
        document.getElementById("totalQuantity").innerText = updatedTotalQuantity;
        document.getElementById("totalPrice").innerText = updatedTotalPrice;
    }
});

// Create object to map form input IDs to their validation patterns and to error message IDs
const inputValidationRules = {
    firstName: {
        pattern: /^[A-Za-z]+$/,
        errorMessageId: "firstNameErrorMsg"
    },
    lastName: {
        pattern: /^[A-Za-z]+$/,
        errorMessageId: "lastNameErrorMsg"
    },
    address: {
        pattern: /.*/,
        errorMessageId: "addressErrorMsg"
    },
    city: {
        pattern: /^[A-Za-z\s-]+$/,
        errorMessageId: "cityErrorMsg"
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessageId: "emailErrorMsg"
    }
};

// Function to add change event listeners to form input fields
function addChangeListeners() {
    const formInputs = document.querySelectorAll(".cart__order__form input");
    formInputs.forEach(input => {
        input.addEventListener("change", event => {
            const inputValue = event.target.value.trim(); // Trim whitespace from string
            const inputId = event.target.id;
            const errorMessageId = inputValidationRules[inputId].errorMessageId;
            const errorMessageElement = document.getElementById(errorMessageId);

            // Get the validation pattern for the input ID
            const { pattern } = inputValidationRules[inputId];

            // Validate input based on the pattern
            if (!pattern.test(inputValue)) {
                errorMessageElement.textContent = `Invalid ${inputId}`;
                errorMessageElement.style.display = "block";
            } else {
                errorMessageElement.textContent = "";
                errorMessageElement.style.display = "none";
            }
        });
    });
}

// Call the function to add change event listeners for the form
addChangeListeners();

// Use event listener for form submission
const orderForm = document.getElementsByClassName("cart__order__form")[0];
orderForm.addEventListener("submit", event => {
    event.preventDefault(); // Prevent form submission

    // Get user input values from form
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;

    // Perform basic validation for blank fields
    if (!firstName || !lastName || !address || !city || !email) {
        displayErrorMessage("Please fill out all fields.");
        return;
    }

    // Create a contact object from the form input
    const contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };

    // Declare products variable and set its value to an array of product ID strings
    // Get product IDs from cart, using the map method on the cart array
    const products = cart.map(item => item.productId);

    const order = {
        contact,
        products
    }

    // Send order data to the API using a POST request
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(order => {
            // Redirect user to confirmation page using order ID
            window.location.href = `confirmation.html?orderId=${order.orderId}`;
        });
})