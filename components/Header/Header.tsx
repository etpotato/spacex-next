import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import logo from '../../public/img/logo.svg'

const ROUTES = [
  {
    name: 'Launches',
    path: '/',
  },
  {
    name: 'Rockets',
    path: '/rockets',
  },
  {
    name: 'Landpads',
    path: '/landpads',
  },
];

const Header:React.FC = () => {
  const router = useRouter();
  console.log(router);
  return (
    <header className='py-4 bg-amber-700 text-white'>
      <div className='xl:container mx-auto px-8'>
        <nav className='flex flex-wrap items-end'>
          {
            router.route === '/'
              ? ( <a className='select-none py-2 mr-4'>
                  <Image src={logo} alt='SpaceX logo' priority/>
                </a>
              ) : (
                <Link href='/' passHref>
                    <a className='select-none py-2 mr-4'>
                      <Image src={logo} alt='SpaceX logo' priority/>
                    </a>
                  </Link>
              )
          }
          <ul className='sm:flex flex-wrap'>
            { ROUTES.map((route) => {
              const matches = route.path === router.route;
              return (
                <li className='mr-4 py-1 last:mr-0 sm:py-3' key={route.path}>
                  { !matches
                    ? <Link href={route.path} passHref>
                        <a className='block px-4 py-1 border-2 border-white focus:border-cyan-400 hover:border-cyan-400 hover:text-cyan-400 focus:text-cyan-400'>{route.name}</a>
                      </Link>
                    : <span className='block px-4 py-1 border-2 border-zinc-400 text-zinc-400'>{route.name}</span>
                  }

                </li>
              )
            }) }
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
