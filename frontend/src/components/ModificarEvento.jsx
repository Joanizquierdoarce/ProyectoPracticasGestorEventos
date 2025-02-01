import {   useEffect, useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axiosConfig';

const ModificarEvento= ()=>{
    const {id}= useParams()
    const navigate= useNavigate();
    const [error, setError]= useState();
    const [evento, setEvento]= useState({
    nombreEvento: "",
    fechaEvento: "",
    horaEvento: "",
    ubicacion: "",
    descripcion: ""
    });

    useEffect(()=>{
      const fechtModificarEvento= async()=>{
          try{
              const response = await apiClient.get(`/eventos/${id}`)
              if (response.data) {
                setEvento(response.data);
            } else {
                setError("No se encontraron datos del evento");
            }
          }  catch (error) {
            setError(error.response?.data?.mensaje || "Error al conectar con el servidor");
        }    
};
fechtModificarEvento();
}, [id])
const CambiosFormulario = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const aceptarCambios = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response=await apiClient.put(`/eventos/${id}`, evento, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("Evento agregado:", response.data);
      alert("Evento modificado con éxito");
      navigate("/evento"); 
    } catch (error) {
        if(error.response){
            setError(error.response.data.mensaje || "Error al modificar el evento")
        }else{
            setError("Error al conectar con el servidor")
        };
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Modificar Evento</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={aceptarCambios} className="space-y-4">
        <input type="text" name="nombreEvento" value={evento.nombreEvento} onChange={CambiosFormulario} required className="w-full p-2 border"/>
        <input type="date" name="fechaEvento" value={evento.fechaEvento} onChange={CambiosFormulario} required className="w-full p-2 border"/>
        <input type="time" name="horaEvento" value={evento.horaEvento} onChange={CambiosFormulario} required className="w-full p-2 border"/>
        <input type="text" name="ubicacion" value={evento.ubicacion} onChange={CambiosFormulario} required className="w-full p-2 border"/>
        <textarea name="descripcion" value={evento.descripcion} onChange={CambiosFormulario} required className="w-full p-2 border"/>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
      </form>
    </div>
  );
};


export default ModificarEvento;