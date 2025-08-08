import {APP_NAME} from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import Search from './search'
import SellButton from './sell-button'
import './styles.css';

export default function Header() {
  return (
    <nav
      /*style={{ backgroundColor: '#9cacb8' }}*/ className=' sticky top-0 z-50 bg-border backdrop-blur supports-[backdrop-filter]:bg-background/50 border-b   text-black'
    >
      
      <div className=' px-2 '>
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

          <div className=' flex items-center flex-1 max-w-xl'>
            <SellButton />
            <div className='hidden sm:block flex-1'>
              <Search />
            </div>
          </div>
          <Menu />
        </div>
        <div className='md:hidden block py-1'>
          <Search />
        </div>
      </div>
      
      
    </nav>
  )
}
