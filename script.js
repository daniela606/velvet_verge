// Variables globales
let cartCount = 0;
let cartItems = [];
let cartPrices = []; // Para almacenar los precios de los artículos

// Función para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const price = parseFloat(button.closest('.product').getAttribute('data-price')); // Obtener el precio del producto

        cartItems.push(item);  // Agregar el producto al carrito
        cartPrices.push(price); // Agregar el precio al carrito
        cartCount++;  // Incrementar el contador del carrito
        document.getElementById('cart-count').innerText = cartCount;  // Actualizar visualmente el contador
        updateCartModal();  // Actualizar el modal del carrito
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
        payButton.style.display = 'none'; // Ocultar botón de pagar
    } else {
        const itemsHTML = cartItems.map((item, index) => `<p>${item} - $${cartPrices[index].toFixed(2)}</p>`).join('');
        const total = cartPrices.reduce((acc, price) => acc + price, 0); // Calcular el total
        cartItemsContainer.innerHTML = itemsHTML;  // Mostrar cada producto en el carrito
        totalContainer.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`; // Mostrar total
        payButton.style.display = 'block'; // Mostrar botón de pagar
    }
}

// Función para realizar el pago
document.getElementById('pay-button').addEventListener('click', () => {
    alert('¡Gracias por su compra! Su pedido ha sido procesado.');
    cartCount = 0; // Reiniciar contador
    cartItems = []; // Reiniciar lista de artículos
    cartPrices = []; // Reiniciar precios
    updateCartModal(); // Actualizar el modal
    document.getElementById('cart-count').innerText = cartCount; // Actualizar visualmente el contador
});

// Función para aplicar filtros de productos
document.getElementById('applyFilters').addEventListener('click', () => {
    const priceFilter = document.getElementById('filterPrice').value;  // Obtener el filtro de precio
    const categoryFilter = document.getElementById('filterCategory').value;  // Obtener el filtro de categoría

    document.querySelectorAll('.product').forEach(product => {
        const productPrice = parseFloat(product.getAttribute('data-price'));  // Obtener el precio del producto
        const productCategory = product.getAttribute('data-category');  // Obtener la categoría del producto

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
