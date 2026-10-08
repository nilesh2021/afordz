# Afordz

Next.js storefront with Razorpay checkout and server-side order storage.

## Local development

```bash
cp .env.example .env.local
# Add Razorpay test keys to .env.local
npm install
npm run dev
```

Orders are stored in `data/orders.sqlite` (gitignored). Payment logic tests:

```bash
npm run test:payments
npm run health:orders
```

## Production (afordz.in on Vercel)

Vercel cannot write a local SQLite file. Configure **Turso** and redeploy — full steps in **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

Quick check after deploy: `GET /api/orders/health` should return `ok: true`.
