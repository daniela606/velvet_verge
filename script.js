// Variables globales
let cartCount = 0;
let cartItems = [];
let cartPrices = []; 

// Función para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const price = parseFloat(button.closest('.product').getAttribute('data-price')); 

        cartItems.push(item);  
        cartPrices.push(price); 
        cartCount++;  
        document.getElementById('cart-count').innerText = cartCount;  
        updateCartModal(); 
    });
});

// Función para actualizar el contenido del modal del carrito
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    const payButton = document.getElementById('pay-button');

    if (cartCount === 0) {
        cartItemsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalContainer.innerHTML = "<p>Total: $0</p>";
        payButton.style.display = 'none'; 
    } else {
        const itemsHTML = cartItems.map((item, index) => `<p>${item} - $${cartPrices[index].toFixed(2)}</p>`).join('');
        const total = cartPrices.reduce((acc, price) => acc + price, 0); 
        cartItemsContainer.innerHTML = itemsHTML;  
        totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`; 
        payButton.style.display = 'block'; 
    }
}

// Función para realizar el pago
document.getElementById('pay-button').addEventListener('click', () => {
    alert('¡Gracias por su compra! Su pedido ha sido procesado.');
    cartCount = 0; 
    cartItems = []; 
    cartPrices = []; 
    updateCartModal(); 
    document.getElementById('cart-count').innerText = cartCount; 
});

// Función para aplicar filtros de productos
document.getElementById('applyFilters').addEventListener('click', () => {
    const priceFilter = document.getElementById('filterPrice').value;  
    const categoryFilter = document.getElementById('filterCategory').value;  

    document.querySelectorAll('.product').forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));  
        const productCategory = product.getAttribute('data-category');  

        // Verificar el filtro de precio
        let priceMatch = false;
        if (priceFilter === 'low' && productPrice < 50000) priceMatch = true;
        else if (priceFilter === 'medium' && productPrice >= 50000 && productPrice <= 100000) priceMatch = true;
        else if (priceFilter === 'high' && productPrice > 100000) priceMatch = true;
        else if (priceFilter === 'all') priceMatch = true;

        // Verificar el filtro de categoría
        const categoryMatch = (categoryFilter === 'all' || categoryFilter === productCategory);

        // Mostrar u ocultar el producto dependiendo si coincide con los filtros
        if (priceMatch && categoryMatch) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});
