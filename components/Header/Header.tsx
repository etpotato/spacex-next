import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import logo from '../../public/img/logo.svg'

const Header:React.FC = () => {
  const router = useRouter();
  console.log(router);
  return (
    <header className='py-6 bg-black text-white'>
      <div className='xl:container mx-auto px-16'>
        <nav className='flex flex-wrap items-baseline'>
          <Link href='/'>
            <Image src={logo} alt='SpaceX logo' priority/>
          </Link>
          <ul className='contents'>
            <li className='mr-4'>item1</li>
            <li className='mr-4'>item2</li>
            <li className='mr-4'>item3</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;
