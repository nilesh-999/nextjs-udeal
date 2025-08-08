import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import Drop from '@/components/shared/header/drop'

export default async function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex flex-col min-h-screen'>
          
            <Header />
            
            <Drop />
            <main className='flex-l flex flex-col'>{children}</main>
            <Footer />
            
        </div>
        
    )
}