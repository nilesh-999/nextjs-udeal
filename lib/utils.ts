import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

export const toSlug =(text: string): string => 
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'INR',
  style: 'currency',
  minimumFractionDigits: 2,
})  

export function formatCurrency(value: number) {
  return CURRENCY_FORMATTER.format(value)
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')
  
export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

export const round2 =(num: number) =>
  Math.round((num + Number.EPSILON)*100)/100

export const generateID = () =>
  Array.from({ length:24}, () => Math.floor(Math.random()*10)).join('')

export const formatError = (error: any): string => {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return `${error.errors[field].path}: ${errorMessage}` // field: errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.name === 'ValidationError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyValue)[0]
    return `${duplicateField} already exists`
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}