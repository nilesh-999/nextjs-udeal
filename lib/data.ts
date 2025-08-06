import { Data, IProductInput, IUserInput } from '@/types'
import { toSlug } from './utils'
import bcrypt from 'bcryptjs'

const users: IUserInput[] = [
  {
    name: 'Nigesh',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 5),
    role: 'Admin',
    address: {
      fullName: 'Nigesh BourVita',
      street: '111 Main St',
      city: 'Bettiah',
      state: 'Bihar', 
      postalCode: '10001',
      country: 'India',
      phone: '123-456-7890',
    },
    paymentMethod: 'Stripe',
    emailVerified: false,
  },
  {
    name: 'Mait',
    email: 'mait@example.com',
    password: bcrypt.hashSync('123456', 5),
    role: 'User',
    address: {
      fullName: 'Mait',
      street: 'By The Sea Beach',
      city: 'Orissa',
      state: 'Orissa',
      postalCode: '1002',
      country: 'India',
      phone: '123-456-7890',
    },
    paymentMethod: 'Cash On Delivery',
    emailVerified: false,
  },
]
const products: IProductInput[] = [
  {
    name: 'Rolex Holder',
    slug: toSlug('Rolex Holder'),
    category: 'Sheet Holder',
    images: ['/images/logo.png'],
    tags: ['todays-deal'],
    isPublished: true,
    price: 50,
    listPrice: 0,
    brand: 'Rolex',
    avgRating: 4.5,
    numReviews: 7,
    ratingDistribution: [
      { rating: 1, count: 0 },
      { rating: 2, count: 0 },
      { rating: 3, count: 0 },
      { rating: 4, count: 0 },
      { rating: 5, count: 0 },
    ],
    numSales: 9,
    countInStock: 50,
    description: 'This is a Rolex Sheet Holder',
    sizes: [],
    colors: ['black'],
    reviews: [],
  },

  {
    name: 'Omega Drafter',
    slug: toSlug('Omega Holder'),
    category: 'Drafter',
    images: ['/images/logo1.png'],
    tags: ['new-arrival'],
    isPublished: true,
    price: 100,
    listPrice: 0,
    brand: 'Omega',
    avgRating: 4.5,
    numReviews: 7,
    ratingDistribution: [
      { rating: 1, count: 0 },
      { rating: 2, count: 0 },
      { rating: 3, count: 0 },
      { rating: 4, count: 0 },
      { rating: 5, count: 0 },
    ],
    numSales: 9,
    countInStock: 50,
    description: 'This is a Omega Drafter',
    sizes: [],
    colors: [],
    reviews: [],
  },
]

const reviews = [
  {
    rating: 1,
    title: 'Poor quality',
    comment:
      'Very disappointed. The item broke after just a few uses. Not worth the money.',
  },
  {
    rating: 2,
    title: 'Disappointed',
    comment:
      "Not as expected. The material feels cheap, and it didn't fit well. Wouldn't buy again.",
  },
  {
    rating: 2,
    title: 'Needs improvement',
    comment:
      "It looks nice but doesn't perform as expected. Wouldn't recommend without upgrades.",
  },
  {
    rating: 3,
    title: 'not bad',
    comment:
      'This product is decent, the quality is good but it could use some improvements in the details.',
  },
  {
    rating: 3,
    title: 'Okay, not great',
    comment:
      'It works, but not as well as I hoped. Quality is average and lacks some finishing.',
  },
  {
    rating: 3,
    title: 'Good product',
    comment:
      'This product is amazing, I love it! The quality is top notch, the material is comfortable and breathable.',
  },
  {
    rating: 4,
    title: 'Pretty good',
    comment:
      "Solid product! Great value for the price, but there's room for minor improvements.",
  },
  {
    rating: 4,
    title: 'Very satisfied',
    comment:
      'Good product! High quality and worth the price. Would consider buying again.',
  },
  {
    rating: 4,
    title: 'Absolutely love it!',
    comment:
      'Perfect in every way! The quality, design, and comfort exceeded all my expectations.',
  },
  {
    rating: 4,
    title: 'Exceeded expectations!',
    comment:
      'Fantastic product! High quality, feels durable, and performs well. Highly recommend!',
  },
  {
    rating: 5,
    title: 'Perfect purchase!',
    comment:
      "Couldn't be happier with this product. The quality is excellent, and it works flawlessly!",
  },
  {
    rating: 5,
    title: 'Highly recommend',
    comment:
      "Amazing product! Worth every penny, great design, and feels premium. I'm very satisfied.",
  },
  {
    rating: 5,
    title: 'Just what I needed',
    comment:
      'Exactly as described! Quality exceeded my expectations, and it arrived quickly.',
  },
  {
    rating: 5,
    title: 'Excellent choice!',
    comment:
      'This product is outstanding! Everything about it feels top-notch, from material to functionality.',
  },
  {
    rating: 5,
    title: "Couldn't ask for more!",
    comment:
      "Love this product! It's durable, stylish, and works great. Would buy again without hesitation.",
  },
]

const data: Data = {
  users,
  products,
  reviews,
  headerMenus: [
    {
      name: "Today's Deal",
      href: '/search?tag=todays-deal',
    },
    {
      name: 'New Arrivals',
      href: '/search?tag=new-arrival',
    },
    {
      name: 'Collectibles',
      href: '/search?tag=featured',
    },
    {
      name: 'Services',
      href: '/search?tag=best-seller',
    },
  
    {
      name: 'Customer Service',
      href: '/page/customer-service',
    },
    {
      name: 'About Us',
      href: '/page/help',
    },
  ],
  carousels: [
    {
      title: '',
      buttonCaption: 'no',
      image: '/images/banner1.jpg',
      url: '',
      isPublished: true,
    },
    {
      title: '',
      buttonCaption: 'Shop Now',
      image: '/images/banner2.jpg',
      url: '/search?category=Sheet Holder',
      isPublished: true,
    },
    {
      title: '',
      buttonCaption: 'no',
      image: '/images/banner3.jpg',
      url: '',
      isPublished: true,
    },
  ],

}
export const BRANDS= [
  '   for sale  ',
  '   lorem ipsum ',
  '   dolor sit amet ',
  '   consectetur adipiscing elit ',
  '   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ',
  '   ut enim ad minim veniam ',
  

  
  
]
export default data
