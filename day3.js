// =============================================
// BLIPH HOMEPAGE JAVASCRIPT - PROFESSIONAL 3D MOTION
// Enhanced with parallax, 3D transforms, and smooth interactions
// =============================================

// ==================== HERO SLIDESHOW WITH 3D PARALLAX ====================
function startHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // Auto slideshow every 8 seconds
    let interval = setInterval(() => {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }, 8000);

    // Click on left side = previous slide
    const leftZone = document.getElementById('click-left');
    if (leftZone) {
        leftZone.addEventListener('click', () => {
            clearInterval(interval);
            let prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
            // Restart interval
            interval = setInterval(() => {
                let next = (currentSlide + 1) % slides.length;
                showSlide(next);
            }, 8000);
        });

        // Add hover effect to left zone
        leftZone.style.cursor = 'pointer';
    }

    // Click on right side = next slide
    const rightZone = document.getElementById('click-right');
    if (rightZone) {
        rightZone.addEventListener('click', () => {
            clearInterval(interval);
            let next = (currentSlide + 1) % slides.length;
            showSlide(next);
            // Restart interval
            interval = setInterval(() => {
                let n = (currentSlide + 1) % slides.length;
                showSlide(n);
            }, 8000);
        });

        rightZone.style.cursor = 'pointer';
    }

    // Show first slide
    showSlide(0);
}

// ==================== MOUSE PARALLAX EFFECT ====================
function initParallaxEffect() {
    const heroHeader = document.getElementById('hero-header');
    if (!heroHeader) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const slides = document.querySelectorAll('.hero-slide');
        slides.forEach(slide => {
            if (slide.classList.contains('active')) {
                const moveX = mouseX * 20;
                const moveY = mouseY * 15;
                slide.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
}

// ==================== STAGGERED ANIMATION FOR OCCASION CARDS ====================
function animateOccasionCards() {
    const cards = document.querySelectorAll('.occasion-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || index * 150;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target); // Run only once
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

// ==================== SMOOTH SCROLL REVEAL ====================
function scrollRevealAnimation() {
    const elements = document.querySelectorAll('section h2, .product-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// ==================== PRODUCT DATA ====================
const products = [
    {
        id: 1,
        name: "Eternal Rose Bouquet",
        price: 1250,
        img: "rose.jpg"
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

// ==================== CART MANAGEMENT ====================
let cart = [];

// Render featured products
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;

    container.innerHTML = '';

    products.forEach((product, index) => {
        const cardHTML = `
            <div class="product-card" style="animation-delay: ${index * 100}ms;">
                <img src="${product.img}" alt="${product.name}">
                <div style="padding: 1.5rem; text-align: center;">
                    <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #372f83;">${product.name}</h4>
                    <p style="color: #D4AF77; font-size: 1.4rem; font-weight: 600; margin-bottom: 1rem;">
                        ETB ${product.price}
                    </p>
                    <button onclick="addToCart(${product.id})" 
                            style="width: 100%; background-color: #6e2281; color: white; padding: 14px; border: none; border-radius: 9999px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// Add to cart with animation
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    updateCartCount();
    showAddedMessage(product.name);

    // Add ripple effect
    addRippleEffect(event);
}

// Update cart count with animation
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = cart.length;
        countElement.style.animation = 'none';
        setTimeout(() => {
            countElement.style.animation = 'cartPulse 0.6s ease';
        }, 10);
    }
}

// Show notification with 3D motion
function showAddedMessage(productName) {
    const message = document.createElement('div');
    message.className = 'add-to-cart-notification';
    message.textContent = `✓ ${productName} added to cart!`;
    
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Ripple effect on button click
function addRippleEffect(event) {
    if (!event || !event.target) return;

    const button = event.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: rippleAnimation 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    ripple.style.left = (event.clientX - rect.left) + 'px';
    ripple.style.top = (event.clientY - rect.top) + 'px';

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ==================== CART DRAWER MANAGEMENT ====================
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    drawer.classList.toggle('show');

    if (drawer.classList.contains('show')) {
        renderCartItems();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    if (!container || !totalElement) return;

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">Your cart is empty</p>';
        totalElement.textContent = 'ETB 0';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price;

        const itemHTML = `
            <div style="display: flex; gap: 16px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee; animation: slideInLeft 0.4s ease-out;">
                <img src="${item.img}" alt="${item.name}" 
                     style="width: 70px; height: 70px; object-fit: cover; border-radius: 12px; transition: all 0.3s ease;">
                <div style="flex: 1;">
                    <p style="font-weight: 600; margin-bottom: 4px; color: #372f83;">${item.name}</p>
                    <p style="color: #D4AF77; font-weight: 600;">ETB ${item.price}</p>
                </div>
                <button onclick="removeFromCart(${index})" 
                        style="background: none; border: none; color: #e74c3c; font-size: 1.5rem; cursor: pointer; transition: all 0.3s ease; padding: 0; width: 30px;">
                    ✕
                </button>
            </div>
        `;
        container.innerHTML += itemHTML;
    });

    totalElement.textContent = `ETB ${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCartItems();

    // Show removal notification
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = '✓ Item removed from cart';
    notification.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)';
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 2000);
}

// ==================== CART ICON INTERACTIVE EFFECT ====================
function initCartIconAnimation() {
    const cartIcon = document.getElementById('cart-icon');
    if (!cartIcon) return;

    cartIcon.addEventListener('mouseenter', () => {
        cartIcon.style.transform = 'scale(1.4) rotate(15deg)';
        cartIcon.style.filter = 'drop-shadow(0 4px 16px rgba(212, 175, 119, 0.6))';
    });

    cartIcon.addEventListener('mouseleave', () => {
        cartIcon.style.transform = 'scale(1) rotate(0deg)';
        cartIcon.style.filter = 'drop-shadow(0 2px 8px rgba(212, 175, 119, 0.3))';
    });
}

// ==================== NAV ITEM HOVER EFFECT ====================
function initNavHoverEffect() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = '#D4AF77';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = 'white';
        });
    });
}

// ==================== SMOOTH TESTIMONIAL CARD TRANSFORM ====================
function initTestimonialCards() {
    const testimonials = document.querySelectorAll('section:nth-of-type(3) div div');
    
    testimonials.forEach((card, index) => {
        card.className = 'testimonial-card';
        card.style.animationDelay = `${index * 150}ms`;

        // Add quote mark
        const quoteDiv = card.querySelector('div');
        if (quoteDiv && quoteDiv.textContent.includes('"')) {
            const quote = card.querySelector('div');
            quote.className = 'testimonial-quote';
            quote.textContent = '"';
        }

        // Add text styling
        const paragraphs = card.querySelectorAll('p');
        if (paragraphs.length > 0) {
            paragraphs[0].className = 'testimonial-text';
        }

        // Style author section
        const authorSection = card.querySelector('div:last-child');
        if (authorSection) {
            authorSection.className = 'testimonial-author';
            const img = authorSection.querySelector('img');
            if (img) {
                img.parentElement.className = 'author-avatar';
                img.parentElement.innerHTML = `<img src="${img.src}">`;
            }
        }
    });
}

// ==================== LAZY LOADING FOR IMAGES ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-lazy');
                    img.removeAttribute('data-lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ==================== SCROLL PROGRESS BAR ====================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #D4AF77, #f5d29a);
        z-index: 10000;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(212, 175, 119, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
function initRippleButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
            addRippleEffect(e);
        }
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== FORM FOCUS EFFECT ====================
function initFormEffects() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.borderColor = '#D4AF77';
            this.style.boxShadow = '0 0 0 4px rgba(212, 175, 119, 0.15)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
    });
}

// ==================== MODAL FOR QUICK VIEW ====================
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;

    modal.innerHTML = `
        <div style="background: white; max-width: 500px; width: 90%; border-radius: 20px; padding: 25px; position: relative; animation: slideUp 0.4s ease;">
            <button onclick="this.closest('.modal').remove()" 
                    style="position: absolute; top: 15px; right: 20px; font-size: 28px; background: none; border: none; cursor: pointer;">✕</button>
            <img src="${product.img}" style="width: 100%; border-radius: 16px; margin-bottom: 20px;">
            <h2 style="color: #372f83; margin-bottom: 10px;">${product.name}</h2>
            <p style="color: #666; margin-bottom: 20px;">Premium quality handcrafted flowers for your special occasion.</p>
            <p style="font-size: 1.5rem; color: #D4AF77; font-weight: 600; margin-bottom: 20px;">ETB ${product.price}</p>
            <button onclick="addToCart(${product.id}); this.closest('.modal').remove();" 
                    style="width: 100%; background: #6e2281; color: white; padding: 16px; border: none; border-radius: 9999px; font-weight: 600; cursor: pointer;">
                Add to Cart
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(60px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ==================== INITIALIZE ALL FEATURES ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 BLIPH Initializing with 3D Motion Effects...');

    // Core functionality
    startHeroSlideshow();
    initParallaxEffect();
    renderFeaturedProducts();
    animateOccasionCards();
    scrollRevealAnimation();

    // Interactive elements
    initCartIconAnimation();
    initNavHoverEffect();
    initTestimonialCards();
    initScrollProgress();
    initRippleButtons();
    initFormEffects();

    // Cart functionality
    const cartIcon = document.querySelector('nav > div > div:last-child > div');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    // Close cart on background click
    const drawer = document.getElementById('cart-drawer');
    if (drawer) {
        drawer.addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });
    }

    console.log('✅ BLIPH Homepage Loaded with Professional 3D Motion Effects!');
});

// ==================== MOBILE MENU TOGGLE ====================
function toggleMobileMenu() {
    const menu = document.querySelector('nav > div > div:nth-child(2)');
    if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const drawer = document.getElementById('cart-drawer');
        if (drawer && drawer.classList.contains('show')) {
            toggleCart();
        }
    }
});
