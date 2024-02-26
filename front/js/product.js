

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
console.log(id);

/**
 * Get the product from the backend API
 * 
 */
fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json();
    })
    .then(product => {
        console.log(product);
        insertProductDetails(product);
    });

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
