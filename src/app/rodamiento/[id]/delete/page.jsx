"use client"
/*import { useEffect, useState } from "react";
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
        const res = await fetch(`/api/rodamiento/${params.id}`);
        const rodamientos = await res.json();
        console.log(rodamientos);
        setNewRodamiento({
            interior:rodamientos.interior,
            exterior:rodamientos.exterior,
            altura:rodamientos.altura,
            marca:rodamientos.marca,
            cantidad:rodamientos.cantidad
        })
    }
    const handleDelete=async()=>{
        //console.log();
        if(window.confirm(`Esta seguro de eliminar el rodamiento ${newRodamiento.interior}`)){
            try {
                const res=await fetch(`/api/rodamiento/${params.id}`,{
                    method:"DELETE"
                })
                router.push('/rodamiento');
                router.refresh(); 
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        getRodamiento()
    },[])

return(
    <div className="bg-white text-black">
        <h1>{params.id}</h1>
            <h1 className="text-black">Eliminar: {newRodamiento.interior}</h1>
            <button type="button" className="bg-red-500 px-3 py-1 rounded-md" 
                onClick={handleDelete}>
                    Eliminar rodamiento
            </button>
    </div>
)
}
export default HomePage*/
import { useState } from "react";
import { useRouter } from "next/navigation";

const RodamientoDeletePage = () => {
  const [rodamientoId, setRodamientoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
    
  const handleSubmit = () => {
    setIsLoading(true);
    setError(null);

    // Eliminar rodamiento del servidor
    const deleteRodamiento = async () => {
      const response = await fetch(`/api/rodamiento/${rodamientoId._id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        setIsLoading(false);
        setError(null);

        // Redireccionar al usuario a la página de rodamientos
        router.push("/rodamientos");
      } else {
        setIsLoading(false);
        setError(
          "Se produjo un error al eliminar el rodamiento. Código de error: ${response.status}"
        );
      }
    };

    deleteRodamiento();
  };

  return (
    <div>
      <h1>Eliminar rodamiento</h1>

      {error && <div class="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="rodamientoId"
          placeholder="ID del rodamiento"
          value={rodamientoId}
          onChange={(e) => setRodamientoId(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
    </div>
  );
};

export default RodamientoDeletePage;