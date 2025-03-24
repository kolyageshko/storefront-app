# 🛍️ E-Commerce Frontend (Next.js)

This repository contains the **frontend** of an e-commerce store built with **Next.js**. It provides a modern, high-performance user interface but requires a backend to function properly.

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/), React, Tailwind CSS
- **Backend (Required):** Java Spring Boot (not included in this repository)
- **Authentication:** JWT
- **API Communication:** RESTful API

## ⚙️ Features

- 🛒 Product catalog with filtering & sorting
- 🔍 Search functionality
- 🚂 User authentication & authorization
- 💳 Shopping cart & checkout process
- 🎨 Responsive design for all devices

## 📌 Prerequisites

This frontend **requires** a running backend to work.
## 🛠️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/kolyageshko/storefront-app.git
   cd citadelcult-storefront
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API URL:  
   Create a `.env.local` file and set the backend API URL:
   ```ini
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## 🛠️ Deployment

To deploy on **Vercel**, run:
```bash
npm run build
vercel
```
Make sure the backend is also deployed and accessible.

