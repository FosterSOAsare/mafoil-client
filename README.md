# Mafo.il — Client

Frontend for **Mafo.il**, an e-commerce store with a built-in wallet. Shoppers browse products, manage a cart and wishlist, deposit funds through Stripe, check out with their wallet balance and track their orders. Admins manage products, moderate reviews and review all orders and transactions.

The app is built with **Next.js 16 using the Pages Router** and talks to the Express API in [`../server`](../server/README.md).

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
- The [server](../server/README.md) running locally on port `8000` for development

## Getting started

```bash
# 1. Start the API (in another terminal)
cd server
npm install
npm run dev               # http://localhost:8000

# 2. Start the client
cd client
npm install
npm run dev               # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

The first `npm run dev` or `npm run build` generates `next-env.d.ts`, which declares types for image imports. Until it exists, `tsc` reports errors such as `Cannot find module '@/assets/image1.webp'`. The file is git-ignored.

## Environment variables

Create `client/.env` (see `env.example`):

| Variable              | Description |
| --------------------- | ----------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the API, e.g. `http://localhost:8000`. Exposed to the browser. |

Only variables prefixed with `NEXT_PUBLIC_` are available in the browser, so never put secrets in this file.

> The API target used for requests is configured by the rewrites below, not by `NEXT_PUBLIC_API_URL`. Currently the variable is only attached as a `domain` request header in `src/utils/cookie.ts`.

## How the client reaches the API

Every RTK Query API uses a relative base URL such as `/api/products`. Requests go to the Next.js origin and are forwarded to the server by rewrites:

| Environment      | Config file                        | `/api/:path*` is forwarded to |
| ---------------- | ---------------------------------- | ----------------------------- |
| Local dev        | [`next.config.js`](next.config.js) | `http://localhost:8000/api/:path*` |
| Vercel           | [`vercel.json`](vercel.json)       | `https://mafoil-server.onrender.com/api/:path*` |

Because the browser only ever talks to its own origin, there are no CORS issues in development. To point the client at a different backend, update the destination in the matching file.

> Note: `src/pages/api/hello.ts` is shadowed by the `/api/*` rewrite in practice and is not used by the app.

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
│   │   ├── axios.ts          # Axios instance with baseURL "/api"
│   │   └── hookform.ts       # zod schemas for every form
│   ├── data/                 # Static content: FAQ, testimonials, filters, admin nav
│   ├── types/                # Shared TypeScript types
│   ├── utils/                # Cookies, image compression, dates, Swiper helpers
│   ├── assets/               # Product images imported by static data
│   └── styles/globals.css    # Tailwind import, theme tokens and custom CSS
├── next.config.js            # API rewrite for development, allowed image hosts
├── vercel.json               # API rewrite for production
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
- **API slices:** each file in `src/apis` targets one server resource (`authApi` → `/api/auth`, `productsApi` → `/api/products`, …). They all use `createAuthorizationHeader` to attach the user's token.
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
2. Set `NEXT_PUBLIC_API_URL` in the project's environment variables.
3. Make sure `vercel.json` points at the deployed API, and that the API's CORS allow-list and `CLIENT_URL` match the Vercel domain.
4. Set the Node.js version to **24.x** in the project settings.

### CI

[`.github/workflows/node.js.yml`](.github/workflows/node.js.yml) runs `npm ci` and `npm run build` on pushes and pull requests to `main`. It uses **Node 24.x**.

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| API calls return 404 or `ECONNREFUSED` in development | Start the server on port 8000, or update the rewrite in `next.config.js`. |
| `Cannot find module '@/assets/…webp'` from `tsc` | Run `npm run dev` or `npm run build` once to generate `next-env.d.ts`. |
| Remote image fails with "hostname is not configured" | Add the host to `images.remotePatterns` in `next.config.js`. |
| Login says cookies must be allowed | Accept the cookie banner; the choice is stored in localStorage. |
| `npm run lint` fails | `next lint` was removed in Next.js 16. Install ESLint and run it directly if you need linting. |
| Build fails or `npm` warns about `engines` | Switch to Node 24 (`nvm use`). |
