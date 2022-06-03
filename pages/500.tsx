import { NextPage } from 'next'
import Link from 'next/link'

const Custom500:NextPage = () => (
  <div className='min-h-full grid place-content-center text-center'>
    <p className='mb-6 text-8xl'>500</p>
    <p className='mb-12 text-xl'>Internal server error</p>
    <Link href='/' passHref>
      <a className='text-xl block px-8 py-4 border-2 border-black focus:border-cyan-400 hover:border-cyan-400 hover:text-cyan-400 focus:text-cyan-400 hover:-translate-y-0.5 focus:-translate-y-1 outline-none'>Go to Home</a>
    </Link>
  </div>
);

export default Custom500;
