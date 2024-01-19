import React from 'react'
import Link from 'next/link'
function inicio() {
  return (
    <div className='grid gap-3 grid-cols-3 bg-black'>
        <div className="m-20 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 items-center text-center">
                <Link href="/rodamiento/new">
                    <h5 className="items-center text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">REGISTRAR</h5>
                </Link>
            </div>
        </div>
        <div className="m-20 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 items-center text-center">
                <Link href="/rodamiento">
                    <h5 className="items-center text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">VER INVENTARIO</h5>
                </Link>
            </div>
        </div>
        <div className="m-20 max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 items-center text-center">
                <Link href="#">
                    <h5 className="items-center text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ELIMINAR PRODUCTOS</h5>
                </Link>
            </div>
        </div>
    </div>    
    )
}

export default inicio