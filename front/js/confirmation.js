//Get order ID from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

//Display order ID on confirmation page
const orderIdElement = document.getElementById("orderId");
orderIdElement.textContent = orderId;