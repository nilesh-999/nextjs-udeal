import {APP_NAME} from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import Search from './search'
import data, { BRANDS } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import SellButton from './sell-button'
import { Marquee } from './marque'
import styles from './page.module.css'
export default function Header() {
  return (
    <header className='bg-black  text-white'>
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
          
          <div className= 'flex items-center flex-1 max-w-xl'>
          <SellButton/>
            <div className='hidden sm:block flex-1'><Search /></div>
          </div>
          <Menu />
        </div>
        <div className='md:hidden block py-1'>
        
            
            
          <Search />
        </div>
      </div>
      <div className='flex items-center px-3 mb-[1px]  bg-gray-800'>
        <Button
          variant='ghost'
          className='dark header-button flex items-center gap-1 text-base [&_svg]:size-6'>
            <MenuIcon />All
          </Button>
          <div className='flex items-center flex-wrap gap-3 overflow-hidden max-h-[42px]'>{data.headerMenus.map((menu) =>(<Link href={menu.href} key={menu.href} className='header-button !p-2'> {menu.name}</Link>))}
          </div>
          
      </div>
      <div className='bg-gray-100'> <Marquee>
        {BRANDS.map(brand => <img src={`/images/${brand}.png`} key={brand} className={styles.brand}/> )}
        </Marquee></div>
    </header>
  )
}
