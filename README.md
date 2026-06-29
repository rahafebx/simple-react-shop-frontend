# REBEX Shop

A simple e-commerce front-end built with **React 19**, **Vite 8**, and **Tailwind CSS v4**. Features product browsing, cart management, checkout flow, and authentication — all client-side with localStorage persistence.

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
