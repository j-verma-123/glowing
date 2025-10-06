// Shopping Cart Management System with Dropdown
// Add this file as: ./assets/js/cart.js

const CartManager = {
    products: [
      {
        id: 1,
        name: "Facial cleanser",
        price: 29.0,
        originalPrice: 39.0,
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      },
      {
        id: 2,
        name: "Bio-shroom Rejuvenating Serum",
        price: 29.0,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400",
      },
      {
        id: 3,
        name: "Coffee Bean Caffeine Eye Cream",
        price: 29.0,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400",
      },
      {
        id: 4,
        name: "Facial cleanser",
        price: 29.0,
        image: "https://images.unsplash.com/photo-1556228720-da4e85f25e15?w=400",
      },
      {
        id: 5,
        name: "Coffee Bean Caffeine Eye Cream",
        price: 29.0,
        originalPrice: 39.0,
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400",
      },
      {
        id: 6,
        name: "Facial cleanser",
        price: 29.0,
        image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400",
      },
    ],
  
    cart: [],
    dropdownOpen: false,
  
    init() {
      this.loadCart();
      this.createDropdown();
      this.updateCartUI();
      this.attachEventListeners();
    },
  
    createDropdown() {
      // Create dropdown HTML
      const dropdown = document.createElement("div");
      dropdown.id = "cart-dropdown";
      dropdown.className = "cart-dropdown";
      dropdown.innerHTML = `
        <div class="cart-dropdown-header">
          <h3>Shopping Cart</h3>
          <button class="cart-close-btn" aria-label="close cart">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div class="cart-dropdown-items" id="cart-dropdown-items"></div>
        <div class="cart-dropdown-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-dropdown-total">$0.00</span>
          </div>
          <a href="product.html" class="btn btn-primary btn-checkout">Checkout</a>
        </div>
      `;
      document.body.appendChild(dropdown);
  
      // Add styles
      const style = document.createElement("style");
      style.textContent = `
        .cart-dropdown {
          position: fixed;
          top: 80px;
          right: -400px;
          width: 380px;
          max-height: 600px;
          background: #fff;
          box-shadow: -2px 0 20px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          border-radius: 10px 0 0 10px;
        }
  
        .cart-dropdown.open {
          right: 0;
        }
  
        .cart-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
  
        .cart-dropdown-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
  
        .cart-close-btn {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #666;
          transition: color 0.3s;
        }
  
        .cart-close-btn:hover {
          color: #000;
        }
  
        .cart-dropdown-items {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }
  
        .cart-dropdown-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          background: #f9f9f9;
          border-radius: 8px;
          margin-bottom: 15px;
        }
  
        .cart-item-image {
          width: 70px;
          height: 90px;
          border-radius: 5px;
          overflow: hidden;
          flex-shrink: 0;
        }
  
        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
  
        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
  
        .cart-item-name {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          line-height: 1.3;
        }
  
        .cart-item-price {
          font-size: 16px;
          font-weight: 700;
          color: #e85d75;
        }
  
        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
  
        .cart-qty-btn {
          width: 25px;
          height: 25px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
  
        .cart-qty-btn:hover {
          border-color: #e85d75;
          color: #e85d75;
        }
  
        .cart-qty-value {
          font-size: 14px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }
  
        .cart-remove-btn {
          background: none;
          border: none;
          color: #ff4444;
          cursor: pointer;
          font-size: 18px;
          padding: 5px;
          margin-left: auto;
          transition: color 0.3s;
        }
  
        .cart-remove-btn:hover {
          color: #cc0000;
        }
  
        .cart-dropdown-footer {
          padding: 20px;
          border-top: 2px solid #f0f0f0;
          background: #fafafa;
        }
  
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 15px;
        }
  
        #cart-dropdown-total {
          color: #e85d75;
        }
  
        .btn-checkout {
          width: 100%;
          text-align: center;
          padding: 12px;
          font-size: 16px;
        }
  
        .cart-empty-message {
          text-align: center;
          padding: 40px 20px;
          color: #999;
        }
  
        .cart-empty-message ion-icon {
          font-size: 60px;
          margin-bottom: 15px;
          opacity: 0.3;
        }
  
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
  
        .cart-overlay.active {
          opacity: 1;
          pointer-events: all;
        }
  
        @media (max-width: 480px) {
          .cart-dropdown {
            width: 100%;
            right: -100%;
            border-radius: 0;
          }
        }
      `;
      document.head.appendChild(style);
  
      // Create overlay
      const overlay = document.createElement("div");
      overlay.id = "cart-overlay";
      overlay.className = "cart-overlay";
      document.body.appendChild(overlay);
    },
  
    attachEventListeners() {
      // Cart button click
      document.addEventListener("click", (e) => {
        const cartBtn = e.target.closest(".header-action-btn[aria-label='cart item']");
        if (cartBtn) {
          e.preventDefault();
          this.toggleDropdown();
        }
  
        // Close button
        if (e.target.closest(".cart-close-btn")) {
          this.closeDropdown();
        }
  
        // Overlay click
        if (e.target.id === "cart-overlay") {
          this.closeDropdown();
        }
  
        // Add to cart buttons
        const addToCartBtn = e.target.closest(".action-btn[aria-label='add to cart']");
        if (addToCartBtn) {
          const card = addToCartBtn.closest(".shop-card");
          if (card) {
            const titleLink = card.querySelector(".card-title");
            if (titleLink) {
              const productName = titleLink.textContent.trim();
              const product = this.products.find((p) => p.name === productName);
              if (product) {
                this.addToCart(product.id);
              }
            }
          }
        }
  
        // Quantity buttons
        if (e.target.closest(".cart-qty-btn")) {
          const btn = e.target.closest(".cart-qty-btn");
          const index = parseInt(btn.dataset.index);
          const action = btn.dataset.action;
          if (action === "increase") {
            this.updateQuantity(index, 1);
          } else if (action === "decrease") {
            this.updateQuantity(index, -1);
          }
        }
  
        // Remove button
        if (e.target.closest(".cart-remove-btn")) {
          const btn = e.target.closest(".cart-remove-btn");
          const index = parseInt(btn.dataset.index);
          this.removeItem(index);
        }
      });
    },
  
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
      const dropdown = document.getElementById("cart-dropdown");
      const overlay = document.getElementById("cart-overlay");
      
      if (this.dropdownOpen) {
        dropdown.classList.add("open");
        overlay.classList.add("active");
        this.renderDropdown();
      } else {
        dropdown.classList.remove("open");
        overlay.classList.remove("active");
      }
    },
  
    closeDropdown() {
      this.dropdownOpen = false;
      document.getElementById("cart-dropdown").classList.remove("open");
      document.getElementById("cart-overlay").classList.remove("active");
    },
  
    renderDropdown() {
      const container = document.getElementById("cart-dropdown-items");
      
      if (this.cart.length === 0) {
        container.innerHTML = `
          <div class="cart-empty-message">
            <ion-icon name="cart-outline"></ion-icon>
            <p>Your cart is empty</p>
          </div>
        `;
        return;
      }
  
      container.innerHTML = this.cart.map((item, index) => `
        <div class="cart-dropdown-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="cart-item-controls">
              <button class="cart-qty-btn" data-index="${index}" data-action="decrease">-</button>
              <span class="cart-qty-value">${item.quantity}</span>
              <button class="cart-qty-btn" data-index="${index}" data-action="increase">+</button>
              <button class="cart-remove-btn" data-index="${index}" aria-label="remove item">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      `).join("");
    },
  
    loadCart() {
      const cookies = document.cookie.split("; ");
      const cartCookie = cookies.find((c) => c.startsWith("cart="));
      if (cartCookie) {
        try {
          this.cart = JSON.parse(decodeURIComponent(cartCookie.split("=")[1]));
        } catch (e) {
          this.cart = [];
        }
      }
    },
  
    saveCart() {
      const cartData = JSON.stringify(this.cart);
      document.cookie = `cart=${cartData}; path=/; max-age=604800`;
    },
  
    addToCart(productId, quantity = 1) {
      const product = this.products.find((p) => p.id === productId);
      if (!product) return;
  
      const existingItem = this.cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({ ...product, quantity: quantity });
      }
  
      this.saveCart();
      this.updateCartUI();
      this.renderDropdown();
      this.showToast(`${product.name} added to cart!`);
    },
  
    updateQuantity(index, delta) {
      if (this.cart[index]) {
        this.cart[index].quantity = Math.max(1, this.cart[index].quantity + delta);
        this.saveCart();
        this.updateCartUI();
        this.renderDropdown();
      }
    },
  
    removeItem(index) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.updateCartUI();
      this.renderDropdown();
    },
  
    updateCartUI() {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
  
      // Update header badges
      const cartCountElements = document.querySelectorAll(".btn-badge");
      cartCountElements.forEach((el) => {
        if (el.closest(".header-action-btn[aria-label='cart item']")) {
          el.textContent = totalItems;
        }
      });
  
      // Update header total
      const cartTotalElement = document.querySelector(".btn-text");
      if (cartTotalElement) {
        cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
      }
  
      // Update dropdown total
      const dropdownTotal = document.getElementById("cart-dropdown-total");
      if (dropdownTotal) {
        dropdownTotal.textContent = `$${totalPrice.toFixed(2)}`;
      }
    },
  
    showToast(message, duration = 2000) {
      let toast = document.getElementById("cart-toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast";
        toast.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #333;
          color: #fff;
          padding: 15px 25px;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s, transform 0.3s;
          z-index: 9999;
          display: none;
        `;
        document.body.appendChild(toast);
      }
  
      toast.textContent = message;
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
      }, 10);
  
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";
        setTimeout(() => {
          toast.style.display = "none";
        }, 300);
      }, duration);
    },
  };
  
  // Initialize when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    CartManager.init();
  });
  
  window.CartManager = CartManager;