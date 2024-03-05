//Retrieve cart data from local storage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

//Get the cart container element
const cartItemsContainer = document.getElementById("cart__items");

//Clear any existing content in the cart container
cartItemsContainer.innerHTML = "";

//Go through each item in the cart and create HTML elements for them
cart.forEach(item => {
    //Create elements for the cart item
    const cartItemElement = document.createElement("article");
    cartItemElement.classList.add("cart__item");
    cartItemElement.dataset.id = item.productId;
    cartItemElement.dataset.color = item.color;

    //Build dynamic HTML for the cart item
    cartItemElement.innerHTML =
        `<div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photo of a sofa">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>Name of the product</h2>
                <p>Green</p>
                <p>€42.00</p>
            </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Quantity : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Delete</p>
                </div>
            </div>
        </div>`;

    //Insert the cart item element into the cart page by appending to cart container
    cartItemsContainer.appendChild(cartItemElement);   
})

//Add event listener for quantity change
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

//TODO Add event listener for item deletion


