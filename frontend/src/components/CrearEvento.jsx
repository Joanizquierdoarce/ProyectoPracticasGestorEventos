import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig"

const CrearEvento = () => {
  const [evento, setEvento] = useState({ nombreEvento: "", fechaEvento: "", horaEvento: "", ubicacion: "", descripcion: "" });
  const navigate = useNavigate();
  const[error, setError]=useState("")

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
    const response = await apiClient.post("/eventos/", evento);
    console.log("Evento agregado:", response.data);
    alert("Evento creado");
    navigate("/evento")
    }catch(error){
        if(error.response){
            setError(error.response.data.mensaje || "Error al registrar");}else{
                setError("Error al conectar con el servidor"); 
            }
    }
    ; // Redirige a la página principal
  };

  return (
    <div className="max-w-lg mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Evento</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <input type="text" name="nombreEvento" placeholder="Nombre del evento" onChange={handleChange} required className="w-full p-2 border text-center"/>
        <input type="date" name="fechaEvento" onChange={handleChange} required className="w-full p-2 border text-center"/>
        <input type="time" name="horaEvento" onChange={handleChange} required className="w-full p-2 border text-center"/>
        <input type="text" name="ubicacion" placeholder="Ubicación" onChange={handleChange} required className="w-full p-2 border text-center"/>
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required className="w-full p-2 border text-center"/>
        <button type="submit" className="bg-green-500 text-green px-4 py-2 rounded ">Guardar Evento</button>
      </form>
    </div>
  );
};

export default CrearEvento;