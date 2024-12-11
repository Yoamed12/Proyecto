let currentSlide = 0; // Índice del slide actual
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;

function moveSlide(direction) {
  // Cambiar el índice del slide
  currentSlide += direction;

  // Asegurar que no se salga del rango
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1; // Ir al último slide
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0; // Volver al primer slide
  }

  // Mover los slides usando transform
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
  
   setInterval(() => {
    moveSlide(1); // Avanza al siguiente slide cada 5 segundos
  }, 5000); 
}

document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const cartMenu = document.querySelector('.cart-menu');
  const cartItemsList = document.querySelector('.cart-items');
  const totalAmount = document.querySelector('.total-amount');
  const cartCount = document.querySelector('.cart-count');
  const cartIcon = document.querySelector('.cart-btn');
  const closeCartButton = document.querySelector('.close-cart');
  const checkoutButton = document.querySelector('.checkout-btn');

  // Función para mostrar el carrito
  function showCart() {
    cartMenu.classList.remove('hidden');
  }

  // Función para ocultar el carrito
  function closeCart() {
    cartMenu.classList.add('hidden');
  }

  // Función para actualizar la vista del carrito
  function updateCartView() {
    cartItemsList.innerHTML = ''; // Limpiar el contenido previo

    // Mostrar productos en el carrito
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <span>${item.name}</span>
        <span>S/ ${item.price.toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">X</button>
      `;
      cartItemsList.appendChild(listItem);  // Agregar el producto y botón a la lista
    });

    // Calcular el total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `S/ ${total.toFixed(2)}`;
    cartCount.textContent = cart.length;

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartTotal', total.toFixed(2));
  }

  // Llamar a updateCartView para mostrar el carrito al cargar la página
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

  // Mostrar el carrito al hacer clic en el ícono
  cartIcon.addEventListener('click', showCart);

  // Cerrar el carrito al hacer clic en el botón de cierre
  closeCartButton.addEventListener('click', closeCart);

  // Remover producto del carrito
  cartItemsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
      const index = event.target.getAttribute('data-index');
      cart.splice(index, 1); // Eliminar el producto del carrito
      cartCount.textContent = cart.length; // Actualizar contador
      updateCartView(); // Actualizar vista
    }
  });

  // Redirigir a la página de pago
  checkoutButton.addEventListener('click', () => {
    window.location.href = 'pagos/pago.html';
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const paymentButtons = document.querySelectorAll('.payment-btn');
  const paymentForms = document.querySelectorAll('.payment-form');
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalAmount = document.querySelector('.total-amount');

  // Cargar el carrito desde localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = localStorage.getItem('cartTotal') || 0;

  // Evitar que los productos se carguen dos veces al hacer reload
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = ''; // Limpiar la lista antes de agregar productos

    // Mostrar productos en el carrito
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - S/ ${item.price}`;
      cartItemsContainer.appendChild(li);
    });

    // Mostrar el total del carrito
    totalAmount.textContent = `S/ ${total}`;
  }

  // Función para mostrar el formulario seleccionado
  function showPaymentForm(method) {
    paymentForms.forEach((form) => {
      form.classList.remove('active');
      if (form.id === `${method}-form`) {
        form.classList.add('active');
      }
    });
  }

  // Manejar clic en los botones de métodos de pago
  paymentButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const method = button.getAttribute('data-method');
      showPaymentForm(method);
    });
  });

});

// Redirigir a PayPal
function redirectToPayPal() {
  window.location.href = 'https://www.paypal.com/';
}

// busqueda del searchconteiner
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const productsContainer = document.getElementById('products-container');
  const products = Array.from(productsContainer.getElementsByClassName('product'));

  // Función para filtrar productos por nombre
  function filterProducts(query) {
    query = query.toLowerCase(); // Convertir a minúsculas para una búsqueda insensible a mayúsculas

    products.forEach((product) => {
      const productName = product.getAttribute('data-name').toLowerCase(); // Obtener el nombre del producto en minúsculas
      if (productName.includes(query)) {
        product.style.display = 'block'; // Mostrar el producto si coincide con la búsqueda
      } else {
        product.style.display = 'none'; // Ocultar el producto si no coincide
      }
    });
  }

  // Agregar evento a la barra de búsqueda
  searchInput.addEventListener('input', () => {
    const query = searchInput.value; // Obtener el texto de la búsqueda
    filterProducts(query); // Filtrar productos con la consulta
  });
});
