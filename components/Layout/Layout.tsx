import Header from "../Header/Header";

interface props {
  children: React.ReactNode
}

const Layout: React.FC<props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <Header />
      <main className='pt-12 pb-12 isolate flex flex-grow'>
        <div className='xl:container w-full mx-auto px-8 md:px-12 lg:px-16 min-h-full'>
          { children }
        </div>
      </main>
      <footer className='pt-12 pb-4 sm:pb-8'>
        <div className='xl:container grid gap-3 items-center justify-center sm:grid-cols-3 w-full mx-auto px-8 md:px-12 lg:px-16 min-h-full'>
          <a className='max-w-max sm:col-start-3 sm:justify-self-end underline underline-offset-2 hover:-translate-y-1 focus:-translate-y-1 hover:text-cyan-400 focus:text-cyan-400'
            href='http://pavelmareev.dev/'
            target='_blank'
            rel='noreferrer'>
            pavelmareev.dev
          </a>
          <p className='text-center sm:col-start-2 sm:row-start-1'>&copy;2022</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout;
