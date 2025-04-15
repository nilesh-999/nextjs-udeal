'use client'
import React from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SellButton() {

    return(
        <Link href='https://forms.gle/vLRKLSAeeXQaFLcP6' className='px-1 header-button'>
           <Button className='hidden md:block'>
                                       Sell
            </Button>
        </Link>    

    )
}