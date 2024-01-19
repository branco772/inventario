"use client"
import React from 'react'
import Link from 'next/link'
import { signIn, useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

function NavBar() {
  const {data:session}=useSession()
  return (
    <div className='bg-slate-900 flex items-center justify-end py-3 px-24 text-white'>
      {session?.user?(
        <div className='flex gap-x-2 items-center'>
          <p>{session.user.name} {session.user.email}</p>
          {session.user.image && (
          <Image width={150} height={150} className='p-5 w-30 h-30 rounded-full cursor-pointer' src={session.user.image} alt="Perfil" />)}
          <div>
            <button className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={async()=>{await signOut({callbackUrl:"/"})}}>Salir</button>
          </div>
        </div>
      ):(
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={()=>signIn()}>INICIAR SESION</button>
      )}
    </div>
  )
}

export default NavBar