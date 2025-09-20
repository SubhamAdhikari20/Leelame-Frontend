# 🔨 Leelame — Frontend

> **Leelame** — a modern online auction & bidding platform.  
> This repository contains the **frontend** single-page application built with **React (Vite)** and **Tailwind CSS**.  
> It provides responsive UI, real-time bidding updates, user authentication flows, and an extendable spot for AI-powered features (price prediction, fraud signals).

---

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#license) [![Vite](https://img.shields.io/badge/bundler-vite-brightgreen)](#) [![React](https://img.shields.io/badge/framework-react-61DAFB)](#)

---

## 🚀 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Development Notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- Responsive, mobile-first UI using Tailwind CSS.
- Real-time bidding UI (designed to integrate with web sockets / polling).
- User authentication (signup / login / session handling — JWT-ready).
- Auction listing, filtering, sorting, and search.
- Item detail pages with bid history and place-bid flow.
- User dashboard for active bids & listings.
- AI-ready places: price suggestions, auto-snipe prevention flags (planned).
- Component-driven architecture for quick development & testing.

---

## 🧰 Tech Stack

- **React** (Functional components + hooks)
- **Vite** (fast dev server & build)
- **Tailwind CSS** (utility-first styling)
- **React Router** (client routing)
- **Axios / fetch** (API calls)
- Plain **JavaScript / JSX**
- Optional: Socket.IO (or alternatives) for real-time bidding updates

---

## 📁 Repository Structure
eelame-frontend/
├─ public/
│ └─ index.html
├─ src/
│ ├─ assets/ # images, icons, fonts
│ ├─ components/ # reusable components (Button, Card, Modal...)
│ ├─ layouts/ # layout components (MainLayout, AuthLayout)
│ ├─ pages/ # page components (Home, Auction, Profile...)
│ ├─ services/ # API client instances (axios), helpers
│ ├─ contexts/ # React contexts (AuthContext, SocketContext)
│ ├─ hooks/ # custom hooks (useAuth, useSocket, useFetch)
│ ├─ utils/ # utilities (formatters, validators)
│ ├─ App.jsx
│ └─ main.jsx
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ package.json

---

## ✅ Prerequisites

- Node.js v16+ (recommended)
- npm or yarn
- Backend API running (or a mock API) — see backend README for details

---

## 🛠 Local Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/leelame-frontend.git
cd leelame-frontend

# 2. Install dependencies
npm install
# or
# yarn

# 3. Create .env (see Environment Variables below)
cp .env.example .env

# 4. Start dev server
npm run dev
# Open: http://localhost:5173 (or the URL shown in console)
```

--- 

## 🧾 Available Scripts

- npm run dev — Start Vite dev server (hot-reload).
- npm run build — Build production bundle into dist/.
- npm run preview — Preview production build locally.
- npm run lint — (optional) Run linter.
- npm run test — (optional) Run tests.

> Tip: Add Husky + lint-staged for pre-commit checks to keep code quality high.

## 🔑 Environment Variables

Create a .env at project root (Vite expects VITE_ prefixes):
```ini
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_MAPS_API_KEY=your_map_api_key_if_needed
```

> Important: Never commit .env with secrets. Use .env.example in the repo.
---