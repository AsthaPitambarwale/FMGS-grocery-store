// Function to update the cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Call updateCartCount on page load to ensure the correct count is displayed
window.onload = function () {
    updateCartCount();
};

// Select all cart buttons
const cartButtons = document.querySelectorAll('.cart-btn');

cartButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();

        // Find the closest product box (the parent container)
        const productBox = button.closest('.product-box');

        // Extract product details (name, price, and image)
        const productName = productBox.querySelector('.product-name').innerText;
        const productPrice = productBox.querySelector('.price').innerText.replace('Rs. ', ''); // Remove Rs. from price
        const productImage = productBox.querySelector('.product-image').src;

        // Call addToCart function
        addToCart(productName, parseFloat(productPrice), productImage);
    });
});

// Function to add product to the cart and save it in localStorage
function addToCart(name, price, imageUrl) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === name);
    if (existingProductIndex >= 0) {
        // If it exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If it doesn't exist, add it to the cart
        const productItem = {
            name: name,
            price: price,
            image: imageUrl,
            quantity: 1 // Initialize quantity
        };
        cart.push(productItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    // Update the cart count after adding the item
    updateCartCount();

    alert(`${name} has been added to your cart!`);
}
