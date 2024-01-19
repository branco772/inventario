"use client"
import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

function page() {
    const [rodamiento,setRodamiento] = useState(
        {
            interior:"",
            exterior:"",
            altura:"",
            marca:"",
            cantidad:""
        }
    );

    const router = useRouter();
    const params = useParams();

    const handlerSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await fetch(`/api/rodamiento`, {
                method: 'POST',
                body:JSON.stringify(rodamiento),
                //formData
            });
            
            const data = await res.json();
            router.push('/rodamiento');
            router.refresh();
        }catch(error){
            console.error("Error al enviar el formulario:", error);
        }
    };

    const handlerChange=(e)=>{
        setRodamiento({...rodamiento,[e.target.name]:e.target.value})
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-5 max-w-lg flex justify-center h-screen">
                <form onSubmit={handlerSubmit} encType="multipart/form-data">
                    <input type="number" name="interior" placeholder="Ingrese la medida del interior del rodamiento" className="bg-gradient-to-r from-green-100 via-purple-50 to-purple-400 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange}/>
                    <input type="number" name="exterior" placeholder="Ingrese la medida del exterior del rodamiento" className="bg-gradient-to-r from-green-100 via-purple-50 to-purple-400 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange}/>
                    <input type="number" name="altura" placeholder="Ingrese la medida de la altura del rodamiento" className="bg-gradient-to-r from-green-100 via-purple-50 to-purple-400 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange}/>
                    <input type="text" name="marca" placeholder="Ingrese la marca rodamiento" className="bg-gradient-to-r from-green-100 via-purple-50 to-purple-400 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange}/>
                    <input type="number" name="cantidad" placeholder="Ingrese la cantidad de rodamientos" className="bg-gradient-to-r from-green-100 via-purple-50 to-purple-400 border border-gray-300 text-gray-900 text-lg rounded-2xl w-full p-4 my-2" onChange={handlerChange}/>
                    <button type="submit" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 my-2" >Registrar Rodamiento</button>
                </form>
            </div>
        </div>
    )
}

export default page