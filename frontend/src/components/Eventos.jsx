import {useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

const Eventos = () => {
    const [eventos, setEventos] =useState([]);
    const [error, setError] = useState("");
    const [fechaInicio, setFechaInicio]=useState("");
    const [fechaFinal, setFechaFinal]= useState("");
    const [UbicacionSeleccionada, setUbicacionSeleccionada]= useState("");
    const [ubicaciones, setUbicaciones] = useState([])
    useEffect(()=>{
        const fetchEventos = async ()=>{
            try{
                const response = await apiClient.get("/eventos/");
                setEventos(response.data);
            } catch(err){
                if(err.response){
                setError(err.response.data.mensaje || "Error al cargar los eventos")
                }else{
                    setError("Error al conectar con el servidor")
                };
            }
        };

        fetchEventos();
    }, []);

    const eliminarEvento= async(e)=>{
      const eventoId= prompt("Ingrese el ID del evento a modificar:");
    e.preventDefault();
    setError(null);
    try {
      const response=await apiClient.delete(`/eventos/${eventoId}`);
      console.log("Evento eliminado:", response.data);
      alert("Evento eliminado con exito"); 
    } catch (error) {
        if(error.response){
            setError(error.response.data.mensaje || "Error al modificar el evento")
        }else{
            setError("Error al conectar con el servidor")
        };
    }}

      useEffect(()=>{
        const fetchEventosUbicacion= async()=>{
          try{
            const response= await apiClient.get('/eventos')
            const ubicacionesUnicas = [...new Set(response.data.map(evento => evento.ubicacion))]
           setUbicaciones(ubicacionesUnicas); 
          }catch(error){
            if(error.response){
              setError(error.response.data.mensaje || "Error al cargar ubicaciones")
          }else{
              setError("Error al conectar con el servidor")
          };
          }; 
        }; fetchEventosUbicacion();
      }, [])

      const filtrarPorUbicacion = async (ubicacion) => {
        setUbicacionSeleccionada(ubicacion);
        try {
            if (ubicacion === "") {
                const response = await apiClient.get("/eventos");
                setEventos(response.data);
            } else {
                const response = await apiClient.get(`/eventos/${ubicacion}`);
                setEventos(response.data);
            }
        } catch (error) {
            console.error("Error al filtrar eventos por ubicación", error);
        }
    };

    const filtrarPorFecha=async()=>{
      if(!fechaInicio || !fechaFinal){
        setError("Selecciona ambas fechas");
        return;
      }
      try{
        const response=await apiClient.get(`/eventos/${fechaInicio}/${fechaFinal}`)
        setEventos(response.data)
        setError("")
      }catch(error){
        console.error("Error al filtrar eventos por fecha", error);
            setError("Error al filtrar eventos por fecha");
      }
    }

    return (       
<div className="container mt-4">
      <h2 className="mb-4 text-center">Listado de Eventos</h2>
      
      <div className="flex space-x-4 mb-4">
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="p-2 border" />
                <input type="date" value={fechaFinal} onChange={(e) => setFechaFinal(e.target.value)} className="p-2 border" />
                <button onClick={filtrarPorFecha} className="bg-blue-500 text-white px-4 py-2 rounded">Filtrar</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Filtrar por Ubicación:</label>
                <select 
                    value={UbicacionSeleccionada} 
                    onChange={(e) => filtrarPorUbicacion(e.target.value)}
                    className="border p-2 w-full">
                    <option value="">Todas</option>
                    {ubicaciones.map((ubicacion, index) => (
                        <option key={index} value={ubicacion}>{ubicacion}</option>
                    ))}
                </select>
            </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="row">
        {eventos.map((evento, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{evento.nombreEvento}</h5>
                <p className="card-text">
                  <strong>Fecha de evento:</strong> {evento.fechaEvento}
                  <br />
                  <strong>Hora del evento:</strong> {evento.horaEvento}
                  <br />
                  <strong>Ubicación:</strong> {evento.ubicacion}
                  <br />
                  <strong>Descripción:</strong>{evento.descripcion}
                </p>
                <div className="text-center">
                <button
                type="button"
                onClick={eliminarEvento}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-red-600">
                Eliminar evento
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventos;
