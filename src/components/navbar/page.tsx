'use client'

import  Link  from 'next/link';


export default function Navbar() {

  return (
    <>
      <nav className='flex '>
      <Link
          href={"/home"}
          className="text-[#122D9C] flex-1 py-12 text-center"
        >
          Home
        </Link>
      <Link
          href={"/client"}
          className="text-[#122D9C] flex-1 py-12 text-center"
        >
          Client
        </Link>
      <Link
          href={"/server"}
          className="text-[#122D9C] flex-1 py-12 text-center"
        >
          Server
        </Link>
      <Link
          href={"/dashboard"}
          className="text-[#122D9C] flex-1 py-12 text-center"
        >
          Dashboard
        </Link>
      </nav>
    </>
  );
}
