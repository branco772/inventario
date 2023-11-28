"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, useSession, signOut } from 'next-auth/react'

function NavBar() {
  const {data:session}=useSession()
  return (
    <div className='bg-slate-900 flex items-center py-3 justify-between px-24 text-white'>
      <Link href="/">
        <h1>NEXTGOOGLE</h1>
      </Link>
      {session?.user?(
        <div className='flex gap-x-2 items-center'>
          <Link href='/dashboard'>DASHBOARD</Link>
          <p>{session.user.name} {session.user.email}</p>
          {session.user.image && (
          <img className='w-30 h-30 rounded-full cursor-pointer' src={session.user.image} alt="Perfil" />)}

          <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={async()=>{await signOut({callbackUrl:"/"})}}>Salir</button>
        </div>
      ):(
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"' onClick={()=>signIn()}>INICIAR SESION</button>
      )}
    </div>
  )
}

export default NavBar