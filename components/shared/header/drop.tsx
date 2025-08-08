import { Button } from "@/components/ui/button";
import data from "@/lib/data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

export default function Drop() {
  return (
    <div
    /*style={{ backgroundColor: '#0c1012' }}*/
    >
      {/* <AllButton/> */}
      <DropdownMenu>
        <DropdownMenuTrigger className='header-button' asChild>
          <Button
            variant='ghost'
            className='md:hidden dark header-button flex items-center gap-1 text-base [&_svg]:size-6'
          >
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
              <DropdownMenuItem className='text-white py-2'>
                {menu.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <Button
          variant='ghost'
          className='md:hidden dark header-button flex items-center gap-1 text-base [&_svg]:size-6'>
            <MenuIcon />All
          </Button> */}
      <div className='hidden sm:block  flex-wrap overflow-hidden max-h-[50px] px-0.5 p-3 '>
        {data.headerMenus.map((menu) => (
          <Link
            href={menu.href}
            key={menu.href}
            className='bg-inherit text-black !py-3  w-10 rounded-full text-center hover:bg-green-400 !px-5'
          >
            {' '}
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  )
      {/* <div className='bg-gray-600'>
      <Marquee items={BRANDS} />
         
          <Marquee>
        {BRANDS}
        </Marquee> 
        
        </div> */}
}