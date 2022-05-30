import Header from "../Header/Header";

interface props {
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="font-mono">
      <Header />
      <main className='pt-6 pb-12'>
        <div className='xl:container mx-auto px-8 md:px-12 lg:px-16'>
          { children }
        </div>
      </main>
    </div>
  )
}

export default Layout;
