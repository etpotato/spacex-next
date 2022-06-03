import Header from "../Header/Header";

interface props {
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <Header />
      <main className='pt-12 pb-12 isolate flex flex-grow'>
        <div className='xl:container mx-auto px-8 md:px-12 lg:px-16 min-h-full'>
          { children }
        </div>
      </main>
    </div>
  )
}

export default Layout;
