
/*import Link from "next/link";
import TablaRodamiento from '../../components/tablaRodamiento'

export const fetchRodamientos=()=>{
    return fetch('http://localhost:3000/api/rodamiento',{ cache: 'no-store'} )
    .then(res=>res.json());
}

export default async function Rodamientos(){
    const {rodamientos}= await fetchRodamientos();
    return( 
        <div>
            <div className="m-10 p-5">
                <h1 className="text-purple-700 text-6xl font-black">Rodamientos</h1>
                <Link href='/rodamiento/new' className="text-3xl font-black">Registrar nuevo rodamiento</Link>
            </div>
            <div className="p-1.5 min-w-full align-middle flex justify-center h-screen">
            <TablaRodamiento/>
            </div>
        </div>
    )

}*/
// Importa los módulos necesarios
import React from 'react';
import Link from 'next/link';
import TablaRodamiento from '../../components/tablaRodamiento';

// Función para obtener los rodamientos
export const fetchRodamientos = () => {
  return fetch('http://localhost:3000/api/rodamiento', { cache: 'no-store' })
    .then((res) => res.json());
};

// Componente de la página
const Rodamientos = ({ rodamientos }) => {
  return (
    <div>
      <div className="m-10 p-5">
        <h1 className="text-purple-700 text-6xl font-black">Rodamientos</h1>
        <Link href="/rodamiento/new" className="text-3xl font-black">Registrar nuevo rodamiento</Link>
      </div>
      <div className="p-1.5 min-w-full align-middle flex justify-center h-screen">
        <TablaRodamiento />
      </div>
    </div>
  );
};

// Función para obtener datos antes de renderizar la página
export async function getStaticProps() {
  const { rodamientos } = await fetchRodamientos();

  return {
    props: {
      rodamientos,
    },
  };
}

// Exporta el componente de la página
export default Rodamientos;
