"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function HomePage ({params}){
    const [newRodamiento,setNewRodamiento]=useState({
        interior:"",
        exterior:"",
        altura:"",
        marca:"",
        cantidad:""
    });

    const router = useRouter();
    //const params = useParams();

    const getRodamiento = async ()=>{
        try {
            const res = await fetch(`/api/rodamiento/${params.id}`);
            const {rodamientos} = await res.json();
            setNewRodamiento({
                interior:rodamientos.interior,
                exterior:rodamientos.exterior,
                altura:rodamientos.altura,
                marca:rodamientos.marca,
                cantidad:rodamientos.cantidad
            })   
        } catch (error) {
            alert('error al obtener el rodamiento: ', error)
        }
    }
    const handlerSubmit=async(e)=>{
        e.preventDefault();
        console.log(newRodamiento);

        const res = await fetch(`/api/rodamiento/${params.id}`,{
            method:'PUT',
            body:JSON.stringify(newRodamiento),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const data = await res.json();
        //console.log(data);
        router.push('/rodamiento');
        router.refresh();
    }
    const handlerChange=(e)=>{
        //console.log(e.target.value)
        setNewRodamiento({...newRodamiento,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        getRodamiento()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <div>
            <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
                <form onSubmit={handlerSubmit}>
                    <input type="number" name="interior" placeholder="Ingrese el interior" className="bg-gradient-to-r from-green-100 via-purple-300 to-purple-900 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2"onChange={handlerChange} value={newRodamiento.interior}/>
                    <input type="number" name="exterior" placeholder="Ingrese el exterior" className="bg-gradient-to-r from-green-100 via-purple-300 to-purple-900 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange} value={newRodamiento.exterior}/>
                    <input type="number" name="altura" placeholder="Ingrese la altura" className="bg-gradient-to-r from-green-100 via-purple-300 to-purple-900 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange} value={newRodamiento.altura}/>
                    <input type="text" name="marca" placeholder="Ingrese la marca" className="bg-gradient-to-r from-green-100 via-purple-300 to-purple-900 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange} value={newRodamiento.marca}/>
                    <input type="number" name="cantidad" placeholder="Ingrese la cantidad" className="bg-gradient-to-r from-green-100 via-purple-300 to-purple-900 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange} value={newRodamiento.cantidad}/>
                    <button type="submit"
                    className="mt-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >Modificar Rodamiento</button>
                </form>
            </div>
        </div>
    )
}
export default HomePage