document.addEventListener('DOMContentLoaded', () => {
    // Cargar el navbar desde el archivo externo
    fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
        // Insertar el navbar cargado en el contenedor con el id "navbar"
        document.getElementById('navbar').innerHTML = data;
  
        // Inicializar carrito y búsqueda
        initializeCart(); // Asegúrate de tener esta función en tu script
        initializeSearch(); // Inicializa la funcionalidad de búsqueda
  
      })
      .catch(error => console.error('Error cargando el navbar:', error));
  
    // Función para inicializar la búsqueda
    function initializeSearch() {
      const searchInput = document.getElementById('search-input');
      const productsContainer = document.getElementById('products-container');
      const products = Array.from(productsContainer.getElementsByClassName('product'));
  
      function filterProducts(query) {
        query = query.toLowerCase();
        products.forEach((product) => {
          const productName = product.getAttribute('data-name').toLowerCase();
          if (productName.includes(query)) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      }
  
      searchInput.addEventListener('input', () => {
        const query = searchInput.value;
        filterProducts(query);
      });
    }
  
    // Función para inicializar el carrito
    function initializeCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartMenu = document.querySelector('.cart-menu');
      const cartItemsList = document.querySelector('.cart-items');
      const totalAmount = document.querySelector('.total-amount');
      const cartCount = document.querySelector('.cart-count');
      const cartIcon = document.querySelector('.cart-btn');
      const closeCartButton = document.querySelector('.close-cart');
      const checkoutButton = document.querySelector('.checkout-btn');
  
      function showCart() {
        cartMenu.classList.remove('hidden');
      }
  
      function closeCart() {
        cartMenu.classList.add('hidden');
      }
  
      function updateCartView() {
        cartItemsList.innerHTML = '';
        cart.forEach((item, index) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <span>${item.name}</span>
            <span>S/ ${item.price.toFixed(2)}</span>
            <button class="remove-btn" data-index="${index}">X</button>
          `;
          cartItemsList.appendChild(listItem);
        });
  
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmount.textContent = `S/ ${total.toFixed(2)}`;
        cartCount.textContent = cart.length;
  
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTotal', total.toFixed(2));
      }
  
      updateCartView();
      
        // Manejar clic en el botón de "Comprar"
  document.querySelectorAll('.buy-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productElement = event.target.closest('.product');

      if (productElement) {
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');

        // Agregar producto al carrito
        cart.push({
          id: productId,
          name: productName,
          price: parseFloat(productPrice),
        });

        // Actualizar la vista y contador del carrito
        cartCount.textContent = cart.length;
        updateCartView();

        alert(`${productName} agregado al carrito!`);
      }
    });
  });
      
      cartIcon.addEventListener('click', showCart);
      closeCartButton.addEventListener('click', closeCart);
  
      cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
          const index = event.target.getAttribute('data-index');
          cart.splice(index, 1);
          cartCount.textContent = cart.length;
          updateCartView();
        }
      });
  
      checkoutButton.addEventListener('click', () => {
        window.location.href = '/pagos/pago.html';
      });
    }
  });
  