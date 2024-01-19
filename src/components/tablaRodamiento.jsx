"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import dayjs from "dayjs";

export default function TablaRodamiento({ rodamiento }) {
  const [rodamientos, setRodamientos] = useState([]);
  const [filtering, setFiltering] = useState("");
  const columns = [
    {
      header: "INTERIOR",
      accessorKey: "interior",
      footer: "interior",
    },
    {
      header: "EXTERIOR",
      accessorKey: "exterior",
      footer: "exterior",
    },
    {
      header: "ALTURA",
      accessorKey: "altura",
      footer: "altura",
    },
    {
      header: "MARCA",
      accessorKey: "marca",
      footer: "marca",
    },
    {
      header: "CANTIDAD",
      accessorKey: "cantidad",
      footer: "cantidad",
    },
    {
      header: "FECHA DE CREACION",
      accessorKey: "createdAt",
      footer: "fecha creacion",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YY"),
    },
    {
      header: "EDITAR",
      accessorKey: "_id",
      cell: (info) => (
        <Link href={`/rodamiento/${info.getValue()}/update`} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Editar</Link>
      ),
      footer: "editar",
    },
    {
      header: "ELIMINAR",
      accessorKey: "_id",
      cell: (info) => (
        <button onClick={() => handleDelete(info.getValue())} className='text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Eliminar</button>
      ),
      footer: "eliminar",
    },
  ];
  useEffect(() => {
    const fetchRodamientos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/rodamiento", {
          cache: "no-store",
        });
        const data = await response.json();
        // Actualizar el estado con los datos obtenidos
        setRodamientos(data.rodamientos);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRodamientos();
  }, []);

  const table = useReactTable({
    data: rodamientos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rodamientos,
      globalFilter: filtering,
    },
    onSortingChange: setRodamientos,
    onGlobalFilterChange: setFiltering,
  });
  const handleDelete = async (id) => {
    try {
      // Hacer la petición a la API para eliminar el elemento con el ID
      const response = await fetch(`api/rodamiento/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Actualizar el estado para remover la fila del frontend
        const updatedRodamientos = rodamientos.filter(
          (rodamiento) => rodamiento._id !== id
        );
        setRodamientos(updatedRodamientos);
        // Manejar éxito (opcional)
        alert("Rodamiento eliminado exitosamente");
      } else {
        // Manejar error (opcional)
        console.error("Error al eliminar rodamiento");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="🔎 BUSCAR"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        className="border-2 border-indigo-500 text-2xl rounded"
      />
      <table className="table-auto border-double border-4 border-indigo-500 rounded-md shadow-lg shadow-indigo-500/50 divide-x">
        <thead className="text-3xl">
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((header, index) => (
                <th
                  className="px-5 border-2"
                  key={index}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-2xl items-center">
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={index} className="px-5">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup, index) => (
            <tr key={index}>
              {footerGroup.headers.map((footer, index) => (
                <th key={index}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div>
        <button
          className="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => table.setPageIndex(0)}
        >
          Primera Pagina
        </button>
        <button
          className="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => table.previousPage()}
        >
          Pagina Anterior
        </button>
        <button
          className="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => table.nextPage()}
        >
          Pagina Siguiente
        </button>
        <button
          className="relative inline-flex items-center justify-center p-2 mb-2 me-2 overflow-hidden text-2xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Ultima Pagina
        </button>
      </div>
    </div>
  );
}
