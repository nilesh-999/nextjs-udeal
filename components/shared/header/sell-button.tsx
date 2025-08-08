'use client'
import React from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SellButton() {

    return(
        <Link href='https://forms.gle/XQRS81gaEhS3kuCD9' className='px-1 header-button '>
           <Button className='hidden md:block rounded-2xl text-black bg-inherit'>
                                       Sell
            </Button>
        </Link>    

    )
}