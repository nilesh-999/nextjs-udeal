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

const data: Data = {
  users,
  products,
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
      buttonCaption: 'Shop Now',
      image: '',
      url: '/search?category=Drafter',
      isPublished: true,
    },
    {
      title: '',
      buttonCaption: 'Shop Now',
      image: '',
      url: '/search?category=Sheet Holder',
      isPublished: true,
    },
    {
      title: '',
      buttonCaption: 'Shop Now',
      image: '',
      url: '/search?category=Other Stuff',
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
