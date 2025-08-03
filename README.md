# Udeal - Next.js E-commerce Application

This is a [Next.js](https://nextjs.org) e-commerce project with features like product browsing, cart management, checkout, and order confirmation emails.

## Getting Started

### Environment Setup

1. Copy the example environment file to create your own:

```bash
cp .env.local.example .env.local
```

2. Update the `.env.local` file with your own values:
   - Get a Resend API key from [Resend](https://resend.com/api-keys)
   - Configure your Razorpay credentials if using that payment method

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Email Testing

To test email templates locally:

```bash
npm run email
# or
yarn email
```

This will start the React Email preview server at [http://localhost:3000](http://localhost:3000).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
