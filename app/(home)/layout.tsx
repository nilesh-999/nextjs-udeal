import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'

export default async function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-l flex flex-col'>{children}</main>
            <Footer />
        </div>
    )
}