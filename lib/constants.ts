export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Udeal'
export const SERVER_URL=process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'
export const SENDER_NAME = process.env.SENDER_NAME || APP_NAME
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN || 'By You For You'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'An Aamazon clone built with Next.js and MongoDB'
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const FREE_SHIPPING_MIN_PRICE =Number(
    process.env.FREE_SHIPPING_MIN_PRICE || 35
)

export const APP_COPYRIGHT = process.env.NEXT_PUBLIC_APP_COPYRIGHT || `Copyright © 2025 ${APP_NAME}. All rights reserved.`
export const AVAILABLE_PAYMENTS_METHODS = [
       {
        name: 'RazorPay',
        commission: 0,
        isDefault:false,
       },
       {
        name: 'Stripe',
        commission: 0,
        isDefault:false,
       },
       {
        name: 'Cash On Delivery',
        commission: 0,
        isDefault:false
       }

]

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'RazorPay'

export const AVAILABLE_DELIVERY_DATES = [
    {
        name: 'Tommorrow',
        daysToDeliver: 1,
        shippingPrice: 12.9,
        freeShippingMinPrice: 0,
    },
    {
        name: 'Next 3 Days',
        daysToDeliver: 3,
        shippingPrice: 6.9,
        freeShippingMinPrice: 0,

    },
    {
        name: 'Next 5 Days',
        daysToDeliver: 5,
        shippingPrice: 4.9,
        freeShippingMinPrice: 35,
    },
]