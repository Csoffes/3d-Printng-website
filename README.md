# 🖨️ 3D Printing Web App

A modern web application for managing 3D print jobs—from file upload to order tracking and payment. Built to streamline the workflow between customers, print operators, and fulfillment.

> **Status:** Active development / Production-ready (update as needed)

---

## ✨ Features

* 📁 **STL / 3MF File Upload** – Upload and validate 3D models directly in the browser
* 📐 **Automatic Pricing** – Calculate cost based on material, print time, and settings
* 🎨 **Material & Color Selection** – PLA, PETG, ABS, Resin, and more
* 🛒 **Checkout & Payments** – Secure online payments (Stripe-ready)
* 📦 **Order Tracking** – Track print status from submission to completion
* 🧑‍💻 **Admin Dashboard** – Manage orders, update statuses, and adjust pricing
* 🔐 **Authentication** – User accounts with secure login
* 📱 **Responsive Design** – Works on desktop, tablet, and mobile

---

## 🧰 Tech Stack

**Frontend**

* React / Next.js
* Tailwind CSS
* Three.js (optional – for model preview)

**Backend**

* Node.js
* Express / Next.js API Routes
* Stripe API (payments)

**Database**

* PostgreSQL / MySQL / MongoDB (choose one)
* Prisma / Sequelize / Mongoose

**Infrastructure**

* Docker (optional)
* Vercel / Render / Railway / AWS

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
APP_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env` file to version control.

### Run Locally

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 💳 Payments

This app uses **Stripe** for payment processing.

* Supports test and live modes
* Webhooks handle payment confirmation and order status updates
* API keys can be swapped via environment variables for client handoff

---

## 🧑‍💼 Admin Usage

* View all print orders
* Update order status (Queued → Printing → Completed)
* Adjust pricing rules
* Mark orders as shipped or completed

Access control is handled via role-based permissions.

---

## 🧪 Testing

```bash
npm run test
```

(Optional: Add unit, integration, or e2e testing details here.)

---

## 📦 Deployment

Typical deployment flow:

1. Push to main branch
2. CI/CD runs build and checks
3. Deploy to hosting provider (Vercel, Render, etc.)
4. Set environment variables in hosting dashboard

---

## 🛣️ Roadmap

* [ ] Live 3D model preview
* [ ] Print-time estimation via slicer integration
* [ ] Multi-printer support
* [ ] Shipping rate calculation
* [ ] Email & SMS notifications
* [ ] Customer order history dashboard

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## 📄 License

MIT License

---

## 📬 Contact

Built by Cameron Soffes
Email: [Csoffes27@gmail.com]

---

If you use this project, feel free to ⭐ the repo or open an issue with feedback.
