'use client'

import  Link  from 'next/link';


export default function Navbar() {

  return (
    <>
      <nav className='flex '>
      <Link
          href={"/home"}
          className="text-[#122D9C] flex-1 py-12 text-center border border-x-zinc-500 rounded-3xl hover:bg-slate-300 duration-150 hover:text-black"
        >
          Home
        </Link>
      <Link
          href={"/client"}
          className="text-[#122D9C] flex-1 py-12 text-center border border-x-zinc-500 rounded-3xl hover:bg-slate-300 duration-150 hover:text-black"
        >
          Client
        </Link>
      <Link
          href={"/server"}
          className="text-[#122D9C] flex-1 py-12 text-center border border-x-zinc-500 rounded-3xl hover:bg-slate-300 duration-150 hover:text-black"
        >
          Server
        </Link>
      <Link
          href={"/dashboard"}
          className="text-[#122D9C] flex-1 py-12 text-center border border-x-zinc-500 rounded-3xl hover:bg-slate-300 duration-150 hover:text-black"
        >
          Dashboard
        </Link>
      </nav>
    </>
  );
}
