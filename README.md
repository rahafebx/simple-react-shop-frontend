# REBEX Shop

A simple e-commerce front-end built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. Features product browsing, cart management, checkout flow, and authentication — all client-side with localStorage persistence.

<p align="center">
    <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/Vite-8-yellow?logo=vite&logoColor=white" alt="Vite 8" />
    <img src="https://img.shields.io/badge/TailwindCSS-v4-blue?logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/React_Router-v7-red?logo=react-router&logoColor=white" alt="React Router v7" />
    <img src="https://img.shields.io/badge/React_Hook_Form-blue?logo=react-hook-form&logoColor=white" alt="React Hook Form" />
    <img src="https://img.shields.io/badge/Lucide_React-gray?logo=lucide&logoColor=white" alt="Lucide React" />
    <a href="https://rebex-ss.vercel.app/" target="_blank">
        <img src="https://img.shields.io/badge/Live_Demo-green?logo=vercel&logoColor=white" alt="Live Demo" />
    </a>
</p>

## Tech Stack

- **React 19** — Functional components, hooks, Context API
- **Vite 8** — Fast dev server and build tool
- **Tailwind CSS v4** — Utility-first styling with dark mode
- **React Router v7** — Client-side routing
- **React Hook Form** — Form state and validation
- **Lucide React** — Icon library


## Features

- Product catalog with rating, discount badges, and price display
- Shopping cart with quantity controls (add, remove, update)
- Checkout form with validation
- User authentication (login / signup) with localStorage persistence
- Theme toggle (light / dark / system)
- Responsive layout with mobile hamburger menu

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/        # Reusable UI components (Navbar, ProductCard, Rating, Price, Breadcrumb, FormField, ThemeToggle, Container)
├── context/           # React Context providers (Auth, Cart, Theme)
├── data/              # Static product data
├── layout/            # Main layout with header/footer
├── pages/             # Route pages (Home, Auth, Cart, Checkout, ProductDetails, NotFound)
├── App.jsx            # Route definitions
└── main.jsx           # App entry point with providers
```

## Documentation

- [React Basics](./Doc/react-basics.md) — Context API, hooks, component lifecycle
- [Libraries](./Doc/libraries.md) — React Hook Form, React Router, TanStack Query, SWR, Tailwind CSS, Lucide Icons

## Scripts

| Command           | Description          |
| ----------------- | -------------------- |
| `npm run dev`     | Start dev server     |
| `npm run build`   | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint           |

---
<div align="center">
  <h3>📝 License</h3>
  <p><a href="LICENSE">MIT</a> © 2026 - Feel free to use and adapt</p>
</div>

<div align="center">
  <h3>💡 Feedback</h3>
  <p>If you have suggestions or improvements, please contribute!</p>
  <p>See <a href="CONTRIBUTING.md">Contributing Guidelines</a></p>
</div>