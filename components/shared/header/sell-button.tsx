'use client'
import React from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SellButton() {

    return(
        <Link href='https://docs.google.com/forms/d/e/1FAIpQLSdwh6kxt0nYUmvDy9n662SuD1kHEnIYKrRQR3gceALg4r3f6A/viewform' className='px-1 header-button'>
           <Button className='hidden md:block'>
                                       Sell
            </Button>
        </Link>    

    )
}