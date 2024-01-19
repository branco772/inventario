// src/pages/rodamientos.jsx

import React from 'react';
import Link from 'next/link';
import TablaRodamiento from '../../components/tablaRodamiento';

export const fetchRodamientos = () => {
  return fetch('http://localhost:3000/api/rodamiento', { cache: 'no-store' })
    .then((res) => res.json());
};

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

export async function getStaticProps() {
  const { rodamientos } = await fetchRodamientos();

  return {
    props: {
      rodamientos,
    },
  };
}

export default Rodamientos;