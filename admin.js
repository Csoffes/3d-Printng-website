document.addEventListener("DOMContentLoaded", () => {
    const TABLE_BODY = document.querySelector("#orders-table tbody");
    const REFRESH_BTN = document.getElementById("refresh-orders");
    const BACKEND_URL = "http://69.164.193.187:3000"; // replace with your backend
    const SEARCH_INPUT = document.getElementById("search-input");
    const STATUS_FILTER = document.getElementById("status-filter");
    const PAGE_INFO = document.getElementById("page-info");
    const PREV_BTN = document.getElementById("prev-page");
    const NEXT_BTN = document.getElementById("next-page");
    let currentPage = 1;
    const ORDERS_PER_PAGE = 10;

    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "admin-login.html";
    }

    async function fetchOrders(page = 1) {
        const search = SEARCH_INPUT.value.trim();
        const status = STATUS_FILTER.value;
        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/orders?page=${page}&limit=${ORDERS_PER_PAGE}&search=${encodeURIComponent(search)}&status=${status}`);
            const data = await res.json();

            if (!data.success) throw new Error(data.error || "Failed to fetch orders");

            renderOrders(data.orders);

            currentPage = data.page;
            PAGE_INFO.textContent = `Page ${data.page} of ${data.totalPages}`;

            PREV_BTN.disabled = currentPage === 1;
            NEXT_BTN.disabled = currentPage === data.totalPages;

        } catch (err) {
            console.error(err);
            alert("Failed to fetch orders. Check console.");
        }
    }

    function renderOrders(orders) {
        TABLE_BODY.innerHTML = "";
        orders.forEach(order => {
            const tr = document.createElement("tr");
            const cartSummary = order.cart.map(i => `${i.name} x${i.qty}`).join(", ");
            tr.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer_name}</td>
                <td>${order.email}</td>
                <td>${cartSummary}</td>
                <td>$${order.subtotal}</td>
                <td>$${order.total}</td>
                <td>${order.address}</td>
                <td>${order.city}</td>
                <td>${order.state}</td>
                <td>${order.zip}</td>
                <td>${order.status}</td>
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>
                    <button class="status-btn status-pending" data-id="${order.id}" data-status="pending">Pending</button>
                    <button class="status-btn status-shipped" data-id="${order.id}" data-status="shipped">Shipped</button>
                    <button class="status-btn status-cancelled" data-id="${order.id}" data-status="cancelled">Cancel</button>
                </td>
            `;
            TABLE_BODY.appendChild(tr);
        });

        document.querySelectorAll(".status-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                const orderId = btn.dataset.id;
                const newStatus = btn.dataset.status;
                await updateOrderStatus(orderId, newStatus);
            });
        });
    }

    async function updateOrderStatus(orderId, status) {
        try {
            const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to update status");
            fetchOrders(currentPage);
        } catch (err) {
            console.error(err);
            alert("Error updating order status. Check console.");
        }
    }

    // Event listeners
    REFRESH_BTN.addEventListener("click", () => fetchOrders(currentPage));
    SEARCH_INPUT.addEventListener("input", () => fetchOrders(1));
    STATUS_FILTER.addEventListener("change", () => fetchOrders(1));
    PREV_BTN.addEventListener("click", () => fetchOrders(currentPage - 1));
    NEXT_BTN.addEventListener("click", () => fetchOrders(currentPage + 1));

    // Logout
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("adminLoggedIn");
            window.location.href = "admin-login.html";
        });
    }

    // Initial load
    fetchOrders();
});
