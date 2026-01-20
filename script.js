// =====================
// Cart State
// =====================
const cartToggle = document.getElementById("cart-toggle");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// Toggle Cart
// =====================
cartToggle.addEventListener("click", () => {
    cartEl.classList.toggle("open");
});

// =====================
// Add to Cart Buttons
// =====================
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        const image = button.dataset.image;

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, image, qty: 1 });
        }

        saveCart();
        renderCart();
    });
});


// =====================
// Render Cart
// =====================
function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        count += item.qty;

        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";

        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-img">
            <div class="cart-info">
                <strong>${item.name}</strong>
                <span>$${item.price}</span>
            </div>
            <div class="cart-controls">
                <button onclick="changeQty(${index}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
                <button onclick="removeItem(${index})">✕</button>
            </div>
        `;

        cartItemsEl.appendChild(itemEl);
    });

    cartTotalEl.textContent = total.toFixed(2);
    cartCountEl.textContent = count;
}

// =====================
// Cart Actions
// =====================
function changeQty(index, delta) {
    cart[index].qty += delta;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// =====================
// Save Cart
// =====================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// =====================
// Init
// =====================
renderCart();

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    window.location.href = "checkout.html";
});
