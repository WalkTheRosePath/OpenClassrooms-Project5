console.log("Testing...");

//TODO Get the array from the backend API
fetch('http://localhost:3000/api/products')
    .then(data => {
        return data.json();
    })
    .then(items => {
        insertItems(items);
    });

//TODO Get the existing element on the page where I can insert the cards (look in section tag)
const itemHolder = document.getElementById("items");

//TODO Iterate over the array that I got from the backend
function insertItems(items) {
    for (let i = 0; i < items; i++){
        const item = items[i];
        console.log(item);
    }
}
//      AND get the current element in the array
//      AND create a new DOM element to be inserted into the homepage
//      AND insert current element's info into the new DOM element
//      AND append (child) new DOM element into existing section tag element on page