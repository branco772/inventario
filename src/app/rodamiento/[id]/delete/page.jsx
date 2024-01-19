"use client"
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
        router.push("/rodamiento");
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