import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { APP_NAME } from '@/lib/constants'
const categories = ['college stuff', 'random']

export default async function Search() {
    return (
        <form action='/search' method='GET' className='flex item-stretch h10'>
            <Select name='category'>
                <SelectTrigger className='w-auto dark:border-gray-200 bg-gray-100 text-black border-r  rounded-none  rtl:rounded-l-none h-10  '>
                    <SelectValue placeholder='All' />
                </SelectTrigger>
                <SelectContent position='popper'>
                    <SelectItem value='all'>All</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-10 '
                placeholder={`Search Site ${APP_NAME}`}
                name='q'
                type='search'
               
            />
            <button
                type='submit'
                className='bg-primary text-primary-foreground text-black rounded-s-none h-10 px-3'
                
            >
                <SearchIcon className='w-6 h-6' />
            </button>
        </form>
    )
}