# Mafo.il — Client

Frontend for **Mafo.il**, an e-commerce store with a built-in wallet. Shoppers browse products, manage a cart and wishlist, deposit funds through Stripe, check out with their wallet balance and track their orders. Admins manage products, moderate reviews and review all orders and transactions.

The app is built with **Next.js 16 using the Pages Router** and talks to the Express API in a separate repository: [FosterSOAsare/mafoil-server](https://github.com/FosterSOAsare/mafoil-server).

---

## Table of contents

- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [How the client reaches the API](#how-the-client-reaches-the-api)
- [npm scripts](#npm-scripts)
- [Project structure](#project-structure)
- [Pages](#pages)
- [State management and data fetching](#state-management-and-data-fetching)
- [Authentication on the client](#authentication-on-the-client)
- [Browser storage](#browser-storage)
- [Styling](#styling)
- [Images](#images)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Tech stack

| Concern          | Library |
| ---------------- | ------- |
| Framework        | [Next.js 16](https://nextjs.org/) (Pages Router, Turbopack) |
| UI               | React 19, TypeScript 5 |
| State & API      | [Redux Toolkit 2](https://redux-toolkit.js.org/) + RTK Query, `react-redux` 9 |
| Forms            | `react-hook-form` 7 + `zod` schemas via `@hookform/resolvers` |
| Styling          | [Tailwind CSS 4](https://tailwindcss.com/) (`@tailwindcss/postcss`) |
| Carousels        | `swiper` 12 |
| Notifications    | `react-toastify` |
| Icons            | `react-icons` |
| Image compression| `compressorjs` (before upload) |

## Requirements

- **Node.js 24** — pinned in `.nvmrc` and `package.json` `engines` (run `nvm use` in this folder). Next.js 16 needs at least 20.9.
- The [API server](https://github.com/FosterSOAsare/mafoil-server) running locally on port `8000` for development

## Getting started

```bash
# 1. Start the API (in another terminal) — see its README for the .env setup
git clone https://github.com/FosterSOAsare/mafoil-server.git
cd mafoil-server
npm install
npm run dev               # http://localhost:8000

# 2. Start the client
git clone https://github.com/FosterSOAsare/mafoil-client.git
cd mafoil-client
npm install
cp .env.example .env
npm run dev               # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

The first `npm run dev` or `npm run build` generates `next-env.d.ts`, which declares types for image imports. Until it exists, `tsc` reports errors such as `Cannot find module '@/assets/image1.webp'`. The file is git-ignored.

## Environment variables

Copy `.env.example` to `client/.env` and fill it in:

| Variable              | Description |
| --------------------- | ----------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the API server, without `/api` — `http://localhost:8000` (the default) locally, `https://mafoil-server-2575.onrender.com` in production. Exposed to the browser and fixed at **build time**. |

Only variables prefixed with `NEXT_PUBLIC_` are available in the browser, so never put secrets in this file.

## How the client reaches the API

The browser calls the API server directly — there is no proxy or rewrite. Every RTK Query API is created with the shared base query in [`src/libs/baseQuery.ts`](src/libs/baseQuery.ts):

```ts
baseQuery: createBaseQuery("/products")   // → ${NEXT_PUBLIC_API_URL}/api/products
```

`createBaseQuery` builds the absolute URL from `NEXT_PUBLIC_API_URL` and attaches the auth header, so the API address is configured in one place.

| Environment | `NEXT_PUBLIC_API_URL` |
| ----------- | --------------------- |
| Local dev   | `http://localhost:8000` (default when unset) |
| Vercel      | `https://mafoil-server-2575.onrender.com` |

Because requests are cross-origin, the server's CORS settings must allow the site's origin. In development the server allows every origin; in production it allows `https://mafoil.vercel.app` (see [`src/app.js`](https://github.com/FosterSOAsare/mafoil-server/blob/master/src/app.js) in the server repo). The variable is inlined at build time, so changing it on Vercel needs a redeploy.

To add a new API, create a file in `src/apis` and pass `createBaseQuery("/<resource>")` as its `baseQuery`.

## npm scripts

| Script          | What it does |
| --------------- | ------------ |
| `npm run dev`   | Starts the dev server on port 3000 with hot reloading. |
| `npm run build` | Type-checks and creates a production build in `.next/`. |
| `npm start`     | Serves the production build (run `build` first). |
| `npm run lint`  | Runs `next lint`. **Not available in Next.js 16** — the command was removed and ESLint is not installed. |

## Project structure

```
client/
├── public/                   # Static files served from / (favicon, hero images)
├── src/
│   ├── pages/                # Routes (Pages Router) — see the table below
│   │   ├── _app.tsx          # Global CSS, Redux <Provider>, <InitialDispatch>
│   │   └── _document.tsx
│   ├── apis/                 # RTK Query API slices, one per server resource
│   ├── slices/               # Redux slices: user, cart, wishlist, notifications
│   ├── store.ts              # configureStore with all reducers and API middleware
│   ├── components/
│   │   ├── atom/             # Buttons, inputs, selects, loaders
│   │   ├── molecules/        # Header, Footer, CartPreview, Notifications, Cookies banner, …
│   │   ├── cards/            # Product, order, wishlist and testimonial cards
│   │   ├── layouts/          # Main page, account and admin layouts
│   │   ├── pages/            # Components used by a specific page (Account, Admin, Product, Homepage)
│   │   ├── InitialDispatch.tsx  # Loads the user, cart, wishlist and notifications on startup
│   │   └── ProtectedRoute.tsx   # Redirects based on login state
│   ├── hooks/                # Reusable hooks (checkout, logout, image upload, debounce, …)
│   ├── libs/
│   │   ├── baseQuery.ts      # Shared RTK Query base query (API URL + auth header)
│   │   └── hookform.ts       # zod schemas for every form
│   ├── data/                 # Static content: FAQ, testimonials, filters, admin nav
│   ├── types/                # Shared TypeScript types
│   ├── utils/                # Cookies, image compression, dates, Swiper helpers
│   ├── assets/               # Product images imported by static data
│   └── styles/globals.css    # Tailwind import, theme tokens and custom CSS
├── next.config.js            # Allowed remote image hosts
├── .env.example              # Template for client/.env
├── postcss.config.js         # Tailwind CSS 4 PostCSS plugin
└── tsconfig.json             # "@/*" → "./src/*" path alias
```

## Pages

| Route | Access | Description |
| ----- | ------ | ----------- |
| `/` | Public | Home page: hero, featured products, testimonials. |
| `/products` | Public | Product listing with category filters and pagination. |
| `/products/[slugName]` | Public | Product details, reviews, recommendations and recently viewed items. |
| `/search` | Public | Product search. |
| `/cart` | Public | Cart. Checking out requires a logged-in, activated account. |
| `/wishlist` | Public | Saved products. |
| `/contact`, `/faq`, `/privacy`, `/tcs` | Public | Contact form and static pages. |
| `/auth/login`, `/auth/register` | Logged out only | Sign in and sign up. |
| `/auth/verify` | Public | Enter the 6-digit email code (`?mode=accountverification\|resetpassword&email=…`). |
| `/auth/resetpassword` | Logged out only | Request a reset code, then set a new password. |
| `/account` | User | Wallet balance, deposit, withdraw and account activation. |
| `/account/orders` | User | Order history. |
| `/orders/[id]` | User | Order details and progress. |
| `/account/transactions` | User | Wallet transaction history. Stripe redirects back here after a deposit. |
| `/account/settings` | User | Update name and password. |
| `/admin` | Admin | Dashboard. |
| `/admin/products` | Admin | Product list. |
| `/products/new`, `/products/[slugName]/edit` | Admin | Create and edit products, including image upload. |
| `/admin/orders` | Admin | All orders. |
| `/admin/reviews` | Admin | Moderate pending reviews. |
| `/admin/transactions`, `/admin/transactions/[transactionId]` | Admin | All transactions and transaction details. |
| `/admin/settings` | Admin | Settings (hidden from the admin navigation). |

User and admin restrictions on the client only control what is shown. The server enforces the actual permissions on every API call.

## State management and data fetching

- **Store:** [`src/store.ts`](src/store.ts) combines four slices (`user`, `cart`, `wishlist`, `notifications`) with twelve RTK Query APIs from [`src/apis`](src/apis).
- **API slices:** each file in `src/apis` targets one server resource (`authApi` → `/api/auth`, `productsApi` → `/api/products`, …). They all use `createBaseQuery` from `src/libs/baseQuery.ts`, which sets the base URL and attaches the user's token with `createAuthorizationHeader`.
- **Startup:** [`InitialDispatch.tsx`](src/components/InitialDispatch.tsx) fetches the logged-in user and, if cookies are accepted, the cart, wishlist and notifications.
- **Syncing:** cart and wishlist changes are kept in Redux and uploaded to the server after 3 seconds of inactivity (debounced).
- **Forms:** every form uses a zod schema from [`src/libs/hookform.ts`](src/libs/hookform.ts) through `useSelectedValuesFromHookForm`. API errors are shown as toasts by `useCreateErrorFromApiRequest`.

## Authentication on the client

1. `POST /api/auth/login` returns a JWT, which the login page stores in a cookie named **`access_token`** for 30 days ([`src/utils/cookie.ts`](src/utils/cookie.ts)).
2. `createAuthorizationHeader` reads that cookie and sends `Authorization: Bearer <token>` on every API request.
3. Logging out (`useLogoutUser`) calls `/api/auth/logout`, deletes the cookie and clears the user, cart, wishlist and notifications from Redux.
4. `ProtectedRoute` redirects logged-in users away from auth pages, and logged-out users away from account pages. `admin.layout.tsx` shows a 404 page to non-admins.

Logging in requires the user to accept the cookie banner first.

## Browser storage

| Key | Storage | Purpose |
| --- | ------- | ------- |
| `access_token` | Cookie | JWT used for API requests. |
| `cookies` | localStorage | Cookie banner choice: `accepted` or `rejected`. |
| `referrer` | localStorage | Referrer user id taken from a `?ref=<userId>` link, sent on registration and then removed. |
| `recents` | localStorage | Slugs of the last five viewed products. |

## Styling

The project uses **Tailwind CSS 4**, which is configured in CSS rather than in a `tailwind.config.js` file.

- [`src/styles/globals.css`](src/styles/globals.css) imports Tailwind (`@import 'tailwindcss'`) and defines the theme in an `@theme` block:
  - Colours: `blue` `#14009f`, `sec` `#000000`, `brown` `#7f4227`, `border` `#e5e7eb`
  - Fonts: `font-playfair` (Playfair Display) and `font-jost` (Jost, the default for all elements), loaded from Google Fonts
  - Max widths: `max-w-6xl` 1024px, `max-w-7xl` 1224px
- Compatibility rules keep Tailwind 3 behaviour for default border colours and pointer cursors on buttons.
- Custom utilities (such as `active-tab`) and the loader animations are also defined in `globals.css`.

To add a colour, font or breakpoint, add a variable to the `@theme` block, e.g. `--color-accent: #ff6600;` makes `bg-accent`, `text-accent` and so on available.

## Images

`next/image` only loads remote images from the hosts allowed in [`next.config.js`](next.config.js):

- `https://res.cloudinary.com` (product images uploaded through the admin forms)
- `https://procvcreator.s3.eu-north-1.amazonaws.com`

Add an entry to `images.remotePatterns` to allow another host. Images are compressed in the browser with `compressorjs` before they are uploaded to `/api/files`.

## Deployment

The client is deployed on **Vercel**:

1. Import the `client` folder as a Vercel project (framework preset: Next.js).
2. Set `NEXT_PUBLIC_API_URL=https://mafoil-server-2575.onrender.com` in the project's environment variables, then redeploy.
3. Make sure the server's CORS allow-list and `CLIENT_URL` match the Vercel domain.
4. Set the Node.js version to **24.x** in the project settings.

### CI

[`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) runs `npm ci` and `npm run build` on pushes and pull requests to `main`. It uses **Node 24.x**.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| API calls fail with `ERR_CONNECTION_REFUSED` in development | Start the server on port 8000, or set `NEXT_PUBLIC_API_URL` to where it runs. |
| API calls fail with a CORS error | Add the site's origin to the CORS allow-list in the server's [`src/app.js`](https://github.com/FosterSOAsare/mafoil-server/blob/master/src/app.js) (production only). |
| `Cannot find module '@/assets/…webp'` from `tsc` | Run `npm run dev` or `npm run build` once to generate `next-env.d.ts`. |
| Remote image fails with "hostname is not configured" | Add the host to `images.remotePatterns` in `next.config.js`. |
| Login says cookies must be allowed | Accept the cookie banner; the choice is stored in localStorage. |
| `npm run lint` fails | `next lint` was removed in Next.js 16. Install ESLint and run it directly if you need linting. |
| Build fails or `npm` warns about `engines` | Switch to Node 24 (`nvm use`). |
