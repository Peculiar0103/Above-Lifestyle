// Menu Data
const menuData = [
    {
        id: 1,
        name: "Grilled Croacker BBQ",
        price: 20000,
        description: "Whole croaker, chargrilled and glazed in smoky pepper sauce.",
        image: "IMAGES/CROAKER BBQ.jpeg"
    },
    {
        id: 2,
        name: "Yam Porridge",
        price: 1800,
        description: "Soft yam simmered in palm oil sauce with fresh vegetables.",
        image: "IMAGES/YAM PORRIDGE.jpeg"
    },
    {
        id: 3,
        name: "Poundo and Seafood Okro",
        price: 24000,
        description: "Smooth poundo yam with a rich seafood okro soup.",
        image: "IMAGES/SEA FOOD OKRO.jpeg"
    },
    {
        id: 4,
        name: "Loaded Spaghetti",
        price: 2000,
        description: "Spaghetti tossed in pepper sauce, loaded with grilled chicken.",
        image: "IMAGES/Loaded spaghetti.jpeg"
    },
    {
        id: 5,
        name: "Gizzard",
        price: 6000,
        description: "Peppered gizzard, pan-seared with onions and spice.",
        image: "IMAGES/Gizzard.jpeg"
    },
    {
        id: 6,
        name: "Native Rice",
        price: 1700,
        description: "Palm oil rice cooked with smoked fish and local spices.",
        image: "IMAGES/Native Rice.jpeg"
    },
    {
        id: 7,
        name: "Above Jollof",
        price: 2500,
        description: "Our signature smoky party jollof, slow-cooked to order.",
        image: "IMAGES/Above Dem Jollof.jpeg",
        badge: "BEST SELLER"
    },
    {
        id: 8,
        name: "Basmati Steam Rice",
        price: 1800,
        description: "Fragrant steamed basmati rice with fresh herbs.",
        image: "IMAGES/Basmati Steam Rice.jpeg"
    },
    {
        id: 10,
        name: "Beef",
        price: 5000,
        description: "Tender cut beef chunks in rich sauce.",
        image: "IMAGES/Beef.jpeg"
    },
    {
        id: 11,
        name: "Spaghetti and Chicken",
        price: 6500,
        description: "Spaghetti in savory sauce, served with crispy chicken.",
        image: "IMAGES/SPAGHETTI AND CHICKEN.jpeg",
        badge: "CHEF'S PICK"
    },
    {
        id: 12,
        name: "Plain Spaghetti",
        price: 2000,
        description: "Classic plain spaghetti tossed in a light herb sauce.",
        image: "IMAGES/PLAIN SPAGHETTI.jpeg"
    },
    {
        id: 13,
        name: "Herb Rice",
        price: 2000,
        description: "Basmati rice flavored with garlic and fresh herbs.",
        image: "IMAGES/Herb rice.jpeg"
    },
    {
        id: 14,
        name: "Fried Rice and Chicken",
        price: 7000,
        description: "Classic fried rice with a grilled chicken quarter.",
        image: "IMAGES/Fried rice and chicken.jpeg",
        badge: "BEST SELLER"
    },
    {
        id: 15,
        name: "Fried Rice",
        price: 2000,
        description: "Traditional Nigerian fried rice, cooked to perfection.",
        image: "IMAGES/Fried Rice.jpeg"
    },
    {
        id: 16,
        name: "Grilled Catfish BBQ",
        price: 20000,
        description: "Whole catfish grilled to perfection in a fiery pepper mix.",
        image: "IMAGES/Grilled catfish.jpeg"
    },
    {
        id: 17,
        name: "Coconut Rice",
        price: 4000,
        description: "Fragrant rice simmered in coconut milk with a light spice kick.",
        image: "IMAGES/Coconut Rice.jpeg"
    }
];

// Cart State
let cart = {};

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartCountElements = document.querySelectorAll('.cart-count');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const emptyCartMsg = document.querySelector('.empty-cart-msg');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize Menu
function initMenu() {
    menuGrid.innerHTML = '';
    menuData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        
        let badgeHtml = item.badge ? `<div class="card-badge">${item.badge}</div>` : '';
        
        card.innerHTML = `
            ${badgeHtml}
            <div class="card-image">
                <img src="${item.image}" alt="${item.name}">
                <button class="favorite-btn"><i class="fa-solid fa-heart" style="color: #ccc;"></i></button>
                <img src="IMAGES/above logo.jpeg" alt="Logo" class="card-logo">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="card-price">₦${item.price.toLocaleString()}</span>
                </div>
                <p class="card-desc">${item.description}</p>
                <div class="card-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                        <span class="qty-value" id="qty-display-${item.id}">0</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <button class="add-btn" id="add-btn-${item.id}" onclick="updateCartQuantity(${item.id}, 1)">Add to cart</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
    updateMenuCardsUI();
}

function updateMenuCardsUI() {
    menuData.forEach(item => {
        const qtyDisplay = document.getElementById(`qty-display-${item.id}`);
        const addBtn = document.getElementById(`add-btn-${item.id}`);
        
        if (qtyDisplay && addBtn) {
            const qty = cart[item.id] ? cart[item.id].quantity : 0;
            qtyDisplay.textContent = qty;
            
            if (qty > 0) {
                addBtn.textContent = "Added";
                addBtn.style.opacity = "0.7";
            } else {
                addBtn.textContent = "Add to cart";
                addBtn.style.opacity = "1";
            }
        }
    });
}

// Cart Functions
function updateCartQuantity(itemId, change) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;
    
    if (cart[itemId]) {
        cart[itemId].quantity += change;
        if (cart[itemId].quantity <= 0) {
            delete cart[itemId];
        }
    } else if (change > 0) {
        cart[itemId] = {
            ...item,
            quantity: change
        };
    }
    
    updateCartUI();
    updateMenuCardsUI();
}

function removeFromCart(itemId) {
    delete cart[itemId];
    updateCartUI();
    updateMenuCardsUI();
}

function updateCartUI() {
    const cartItems = Object.values(cart);
    let totalItems = 0;
    let totalPrice = 0;
    const cartSummarySection = document.getElementById('cartSummarySection');
    
    // Clear current items
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(el => el.remove());
    
    if (cartItems.length === 0) {
        emptyCartMsg.style.display = 'block';
        if (cartSummarySection) cartSummarySection.style.display = 'none';
    } else {
        emptyCartMsg.style.display = 'none';
        if (cartSummarySection) cartSummarySection.style.display = 'block';
        
        cartItems.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">₦${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control" style="padding: 2px 8px; transform: scale(0.9); transform-origin: left; border: 1px solid #444;">
                            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
            // Insert before the empty cart message
            cartItemsContainer.insertBefore(cartItemEl, emptyCartMsg);
        });
    }
    
    // Update count badges
    cartCountElements.forEach(el => el.textContent = totalItems);
    
    // Update prices
    const cartSubtotalPrice = document.getElementById('cartSubtotalPrice');
    const packageFee = 1000;
    
    if (cartSubtotalPrice) cartSubtotalPrice.textContent = `₦${totalPrice.toLocaleString()}`;
    if (cartTotalPrice) cartTotalPrice.textContent = `₦${(totalPrice + packageFee).toLocaleString()}`;
    
    // Update Toast
    updateCartToast(totalItems, totalPrice);
}

function updateCartToast(totalItems, totalPrice) {
    let toast = document.getElementById('cartToast');
    if (totalItems > 0) {
        if (toast) {
            toast.style.display = 'flex';
            document.getElementById('toastItemCount').textContent = `${totalItems} Item(s)`;
            document.getElementById('toastTotalPrice').textContent = `₦${totalPrice.toLocaleString()}`;
        }
    } else {
        if (toast) toast.style.display = 'none';
    }
}

// Select Delivery Time
let selectedDeliveryTime = 'ASAP (within 45 mins)';
function selectTime(btn, timeString) {
    document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDeliveryTime = timeString;
}

function toggleCart(forceOpen = false) {
    if (forceOpen === true) {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
    } else {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
}

function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    const cartItems = Object.values(cart);
    if (cartItems.length === 0) return;
    
    let message = "*NEW ORDER - AboveLifestyle Lekki*%0A%0A";
    let total = 0;
    
    cartItems.forEach(item => {
        message += `🍽️ ${item.quantity}x ${item.name} - ₦${(item.price * item.quantity).toLocaleString()}%0A`;
        total += item.price * item.quantity;
    });
    
    const packageFee = 1000;
    const finalTotal = total + packageFee;
    
    message += `%0A*Subtotal:* ₦${total.toLocaleString()}`;
    message += `%0A*Package fee:* ₦${packageFee.toLocaleString()}`;
    message += `%0A*Total:* ₦${finalTotal.toLocaleString()}%0A`;
    
    // Append customer details
    const name = document.getElementById('custName').value.trim() || 'Not provided';
    const phone = document.getElementById('custPhone').value.trim() || 'Not provided';
    const address = document.getElementById('custAddress').value.trim() || 'Not provided';
    const landmark = document.getElementById('custLandmark').value.trim() || 'None';
    const notes = document.getElementById('custNotes').value.trim() || 'None';
    
    message += `%0A*DELIVERY DETAILS*%0A`;
    message += `Name: ${name}%0A`;
    message += `Phone: ${phone}%0A`;
    message += `Address: ${address}%0A`;
    message += `Landmark: ${landmark}%0A`;
    message += `Delivery Time: ${selectedDeliveryTime}%0A`;
    message += `Special Instructions: ${notes}%0A`;
    
    message += `%0APlease confirm my order and let me know payment details.`;
    
    const whatsappNumber = "2349038400000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    updateCartUI(); // Initialize empty state
});
