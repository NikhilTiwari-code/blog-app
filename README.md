# Blog App

A minimal social-blog platform built with **React 19**, **Vite**, **TailwindCSS 4** and **Appwrite Cloud**.

Users can sign-up, create posts with rich-text (TinyMCE), edit / delete their own posts and browse their feed.

<p align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/screenshot.png" alt="Blog screenshot" width="700"/>
</p>

---

## ✨ Tech Stack

| Layer | Tech |
|-------|------|
| Front-end | React 19, Vite 6, TailwindCSS 4 |
| State | Redux Toolkit |
| Auth & DB | Appwrite Cloud (Database, Storage, Auth) |
| Rich Text | TinyMCE React |
| Deployment | Vercel (preview + production) |

---

## 🚀 Getting Started

### Prerequisites

* Node 18 LTS or later
* An [Appwrite](https://appwrite.io) project with Database, Bucket and Web Platform configured

### 1. Clone & install

```bash
# clone
$ git clone https://github.com/<your-user>/blog-app.git
$ cd blog-app/blogapp

# install deps
$ npm ci
```

### 2. Configure environment variables

Create a `.env` file in `blogapp/`:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECTID=xxxxxxxxxxxx
VITE_APPWRITE_DATABASEID=xxxxxxxxxxxx
VITE_APPWRITE_COLLECTIONID=xxxxxxxxxxxx
VITE_APPWRITE_BUCKETID=xxxxxxxxxxxx
VITE_TINYMCE_API_KEY=your_tinymce_key
```

> Note: add these same vars in Vercel → Settings → Environment Variables.

### 3. Run locally

```bash
npm run dev
# http://localhost:5173
```

### 4. Lint

```bash
npm run lint
```

### 5. Build

```bash
npm run build   # outputs to dist/
```

---

## 🗂️ Project Structure (key parts)

```
blogapp/
├─ public/             # static assets
├─ src/
│  ├─ appwrite/        # API wrappers (auth.js, dbConfig.js)
│  ├─ components/      # UI components
│  ├─ pages/           # route pages (HomePage, AllPost, Post, ...)
│  ├─ store/           # Redux slices
│  ├─ main.jsx         # entry point
│  └─ App.jsx          # layout & routing
├─ .env.example        # sample env file
├─ vite.config.js      # Vite config
└─ tailwind.config.js  # Tailwind config
```

---

## 📦 Deployment

This repo is set up for **Vercel** continuous deployment:

1. Every push to `main` triggers a Preview URL like:
   `https://blog-app-git-main-<user>-<hash>.vercel.app`
2. Promote a preview or mark the branch as Production to update the
   production domain `https://blog-app-three-ochre.vercel.app`.

Netlify users can use the provided `netlify.toml` (root directory `blogapp`).

---

## 📝 License

MIT © 2025 Nikhil Tiwari


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
