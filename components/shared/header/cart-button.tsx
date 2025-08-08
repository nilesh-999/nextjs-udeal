'use client'

import { ShoppingCart} from 'lucide-react'
import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils'
import useCartStore from '@/hooks/use-cart-store'
import  useCartSidebar from '@/hooks/use-cart-sidebar'
import { FaOpencart } from "react-icons/fa";
export default function CartButton() {
  const isMounted = useIsMounted()
  const {
    cart: { items },
  } = useCartStore()
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
  const isCartSidebarOpen = useCartSidebar()
  return (
    <Link href='/cart' className='px-1 header-button'>
      <div className='flex items-end text-xs relative'>
        <FaOpencart className='h-8 w-8' />

        {isMounted && (
          <span
            className={cn(
              ` bg-inherit  px-1 rounded-full text-black text-base font-bold absolute right-[23px] top-[-11px] z-10`,
              cartItemsCount >= 100 && 'text-sm px-0 p-[1px]'
            )}
          >
            {cartItemsCount}
          </span>
        )}
        <span className='font-bold '>Cart</span>
        {isCartSidebarOpen && (
          
          <div className= {`absolute top-[20px] right-[-16px] rotate-[-90deg] z-0 -0 h-0 border-l-[7px] border-b-[8px] border-transparent border-b-background`}></div>
        )}
      </div>
    </Link>
  )
}
