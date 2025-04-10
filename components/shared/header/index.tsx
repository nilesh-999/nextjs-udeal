import {APP_NAME} from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import Search from './search'
import data, { BRANDS } from '@/lib/data'
import SellButton from './sell-button'
import Marquee from './marque'
import styles from './page.module.css'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import './styles.css';

export default function Header() {
  return (
    <header style={{ backgroundColor: '#0d1216' }} className='  text-white'>
      <div className='px-2'>
      
        <div className='flex items-center justify-between'>
        
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center header-button font-extrabold text-2xl m-1 '
            >
              <Image
                src='/icons/logo.png'
                width={60}
                height={60}
                alt={`${APP_NAME} logo`}
              />
              <Image
                src='/icons/logo1.png'
                width={108}
                height={40}
                alt={`${APP_NAME} logo`}
              />
            </Link>
                 
          </div>
          
          <div className= ' flex items-center flex-1 max-w-xl'>
          <SellButton/>
            <div className='hidden sm:block flex-1'><Search /></div>
          </div>
          <Menu />
        </div>
        <div className='md:hidden block py-1'>
        
            
            
          <Search />
        </div>
      </div>
      <div style={{ backgroundColor: '#0d1216' }} className=' flex items-center px-3 mb-[1px] '>
        {/* <AllButton/> */}
        <DropdownMenu>
  <DropdownMenuTrigger className='header-button' asChild>
    <Button
      variant='ghost'
      className='md:hidden dark header-button flex items-center gap-1 text-base [&_svg]:size-6'>
      <MenuIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    className='w-56 bg-gray-900 shadow-md text-white'
    style={{ zIndex: 1000 }}
    align='end'
  >
    {data.headerMenus.map((menu) => (
      <Link href={menu.href} key={menu.href}>
        <DropdownMenuItem className='text-white py-2'>{menu.name}</DropdownMenuItem>
      </Link>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
        {/* <Button
          variant='ghost'
          className='md:hidden dark header-button flex items-center gap-1 text-base [&_svg]:size-6'>
            <MenuIcon />All
          </Button> */}
          <div className='hidden sm:block  flex-wrap overflow-hidden max-h-[50px] px-0.5 p-3'>{data.headerMenus.map((menu) =>(<Link href={menu.href} key={menu.href} className='header-button !px-5'> {menu.name}</Link>))}
          </div>
          
      </div>
      {/* <div className='bg-gray-600'>
      <Marquee items={BRANDS} />
         
          <Marquee>
        {BRANDS}
        </Marquee> 
        
        </div> */}
    </header>
  )
}
