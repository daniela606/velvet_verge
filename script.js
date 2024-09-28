// Variables globales
let cartCount = 0;
let cartItems = [];

// Función para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        cartItems.push(item);  // Agregar el producto al carrito
        cartCount++;  // Incrementar el contador del carrito
        document.getElementById('cart-count').innerText = cartCount;  // Actualizar visualmente el contador
        document.getElementById('cart-items').innerText = `Tienes ${cartCount} artículos en tu carrito.`;  // Mostrar mensaje en el modal
    });
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
        if (priceFilter === 'low' && productPrice < 50) priceMatch = true;
        else if (priceFilter === 'medium' && productPrice >= 50 && productPrice <= 100) priceMatch = true;
        else if (priceFilter === 'high' && productPrice > 100) priceMatch = true;
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
