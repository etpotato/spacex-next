import Header from "../Header/Header";

interface props {
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="font-mono">
      <Header />
      <main className='py-6'>
        <div className='xl:container mx-auto px-8 lg:px-16'>
          { children }
        </div>
      </main>
    </div>
  )
}

export default Layout;
