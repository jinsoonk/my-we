// =============================================
// BLIPH HOMEPAGE JAVASCRIPT - main.js
// This file adds interactivity to your homepage
// We keep it simple and well-commented so you understand every line
// =============================================


// ==================== HERO SLIDESHOW (Auto + Manual Arrows) ====================
let currentSlide = 0;
let slideInterval;

function startHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) {
        console.error("No hero slides found! Check image paths and HTML.");
        return;
    } 

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }
    // Refresh brand overlay fade effect
document.querySelector('.hero-brand-content').style.opacity = '0';
setTimeout(() => {
    document.querySelector('.hero-brand-content').style.opacity = '1';
}, 300);

    // Show first slide
    showSlide(0);

    // Auto change every 5 seconds
    slideInterval = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, 5000);

    // Manual buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval); // Stop auto when user clicks
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
            // Restart auto after 8 seconds
            slideInterval = setInterval(() => {
                let next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }, 5000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
            slideInterval = setInterval(() => {
                let n = (currentSlide + 1) % slides.length;
                showSlide(n);
            }, 5000);
        });
    }
}

// Call it when page loads
document.addEventListener('DOMContentLoaded', function() {
    startHeroSlideshow();
    // ... keep your other code (renderFeaturedProducts, etc.)
});
// 1. Sample Products Data (you can edit names, prices, and image paths later)
const products = [
    {
        id: 1,
        name: "Eternal Rose Bouquet",
        price: 1250,
        img: "rose.jpg"   // ← Replace with your real image path
    },
    {
        id: 2,
        name: "Wedding Arch Flowers",
        price: 4500,
        img: "weda.jpg"
    },
    {
        id: 3,
        name: "Birthday Sunshine Box",
        price: 890,
        img: "birs.jpg"
    },
    {
        id: 4,
        name: "Luxury Party Centerpiece",
        price: 2100,
        img: "lux.jpg"
    }
];

// 2. Cart Array - will store items added by user
let cart = [];

// =============================================
// 3. Render Featured Products on Homepage
// This function creates the product cards dynamically
// =============================================
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;   // Safety check
    
    container.innerHTML = '';   // Clear any old content first
    
    products.forEach(product => {
        const cardHTML = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <div style="padding: 1.5rem; text-align: center;">
                    <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">${product.name}</h4>
                    <p style="color: #D4AF77; font-size: 1.4rem; font-weight: 600; margin-bottom: 1rem;">
                        ETB ${product.price}
                    </p>
                    <button onclick="addToCart(${product.id})" 
                            style="width: 100%; background-color: #0A2540; color: white; padding: 14px; border: none; border-radius: 9999px; font-weight: 600; cursor: pointer;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;   // Add each card to the grid
    });
}

// =============================================
// 4. Add item to cart function
// =============================================
function addToCart(id) {
    // Find the product by its id
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // Add to cart array
    cart.push(product);
    
    // Update cart count in navbar
    updateCartCount();
    
    // Show a nice temporary message
    showAddedMessage(product.name);
}

// Update the number shown on the cart icon
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
    }
}


// Show "added to cart" notification
function showAddedMessage(productName) {
    const message = document.createElement('div');
    message.textContent = `${productName} added to cart!`;
    message.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #D4AF77;
        color: #0A2540;
        padding: 16px 24px;
        border-radius: 9999px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        font-weight: 600;
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(message);
    
    // Remove message after 2.5 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => message.remove(), 300);
    }, 2500);
}

// =============================================
// 5. Cart Drawer Functions
// Open / Close the sliding cart
// =============================================
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;
    
    // Toggle the "show" class we defined in CSS
    drawer.classList.toggle('show');
    
    // If opening, render the current cart items
    if (drawer.classList.contains('show')) {
        renderCartItems();
    }
}

// Render items inside the cart drawer
function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!container || !totalElement) return;
    
    container.innerHTML = '';   // Clear first
    
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        
        const itemHTML = `
            <div style="display: flex; gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <img src="${item.img}" alt="${item.name}" 
                     style="width: 70px; height: 70px; object-fit: cover; border-radius: 12px;">
                <div style="flex: 1;">
                    <p style="font-weight: 600; margin-bottom: 4px;">${item.name}</p>
                    <p style="color: #D4AF77; font-weight: 600;">USD ${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index});" 
                        style="background: none; border: none; color: #e74c3c; font-size: 1.2rem; cursor: pointer;">
                    ✕
                </button>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
    
    // Show total price
    totalElement.textContent = `USD ${total}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);        // Remove the item at that position
    updateCartCount();
    renderCartItems();            // Refresh the cart display
}

// =============================================
// 6. Initialize everything when page loads
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    // Render the featured products
    renderFeaturedProducts();
    
    // Make cart icon clickable
    const cartIcon = document.querySelector('nav > div > div:last-child');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }
    
    // Optional: Close cart when clicking outside (advanced but nice)
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        drawer.addEventListener('click', function(e) {
            if (e.target === drawer) {
                toggleCart();
            }
        });
    }
 
    console.log('✅ BLIPH Homepage JS loaded successfully!');
});
