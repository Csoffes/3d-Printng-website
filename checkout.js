document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const checkoutItemsEl = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const taxEl = document.getElementById("checkout-tax");
  const shippingEl = document.getElementById("checkout-shipping");
  const totalEl = document.getElementById("checkout-total");

  const TAX_RATE = 0.0825;
  const SHIPPING_COST = 7.99;

  let subtotal = 0;

  // =====================
  // Render Cart Items
  // =====================
  checkoutItemsEl.innerHTML = "";

  cart.forEach(item => {
    subtotal += item.price * item.qty;

    const itemEl = document.createElement("div");
    itemEl.className = "checkout-item";
    itemEl.innerHTML = `
      <img src="${item.image || 'Images/placeholder.webp'}" alt="${item.name}">
      <div class="item-info">
        <strong>${item.name}</strong><br>
        Qty: ${item.qty}
      </div>
      <div>$${(item.price * item.qty).toFixed(2)}</div>
    `;
    checkoutItemsEl.appendChild(itemEl);
  });

  // =====================
  // Totals
  // =====================
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + tax + SHIPPING_COST).toFixed(2);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  shippingEl.textContent = SHIPPING_COST.toFixed(2);
  totalEl.textContent = total.toFixed(2);

  // =====================
  // Submit Order (Stripe Checkout)
  // =====================
  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!cart.length) return alert("Your cart is empty.");

    const orderData = {
      customer_name: document.getElementById("full-name").value,
      email: document.getElementById("email")?.value || "test@example.com",
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip: document.getElementById("zip").value,
      cart,
      subtotal,
      tax,
      shipping: SHIPPING_COST,
      total
    };

    try {
      const res = await fetch("http://69.164.193.187:3000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create Stripe checkout session");
      }

    } catch (err) {
      console.error(err);
      alert("There was a problem initiating payment.");
    }
  });
});
