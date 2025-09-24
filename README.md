# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

# Product Catalog MVP

A responsive e-commerce product catalog built with Next.js, TypeScript, Sanity CMS, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan) ![Sanity](https://img.shields.io/badge/Sanity-3-red)

## Features

- 🛍️ Product listing with responsive grid
- 🔍 Real-time search and filtering
- 💰 Price range and category filters
- 📊 Sort by price and name
- 📱 Mobile-first responsive design
- 🖼️ Product detail pages with related products
- ⚡ Optimized images and performance

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio
- **Icons**: Heroicons

## Quick Start

### 1. Setup Frontend

```bash
npx create-next-app@latest product-catalog-frontend --typescript --tailwind --app
cd product-catalog-frontend
npm install @sanity/client @sanity/image-url next-sanity @heroicons/react clsx
```

### 2. Setup Sanity

```bash
cd ..
sanity init  # Choose: Clean project, TypeScript, output: product-catalog-sanity
```

### 3. Environment Variables

Create `product-catalog-frontend/.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Run Applications

```bash
# Terminal 1 - Frontend (Port 3000)
cd product-catalog-frontend && npm run dev

# Terminal 2 - Sanity Studio (Port 3333)
cd product-catalog-sanity && sanity dev
```

## Project Structure

```
├── product-catalog-frontend/    # Next.js app
│   ├── src/app/                # Pages (listing, detail)
│   ├── src/components/         # UI components
│   ├── src/lib/               # Sanity client
│   └── src/types/             # TypeScript types
└── product-catalog-sanity/     # Sanity studio
    ├── schemas/               # Content schemas
    └── sanity.config.ts      # Configuration
```

## Schema (Sanity)

Products have: `title`, `description`, `image`, `category`, `price`, `availability`, `slug`

## Demo URLs

- Frontend: http://localhost:3000
- Sanity Studio: http://localhost:3333

## Deployment

- **Frontend**: Deploy to Vercel
- **Sanity**: Run `sanity deploy` in studio directory

---

Built for Product Catalog MVP assignment ⚡
