import {useState} from "react";
import apiClient from "../api/axiosConfig";


const Register = () => {
    const [nombreUsuario, setNombreUsuario]=useState("");
    const [correoUsuario, setcorreo]=useState("");
    const [password, setPassword]=useState("");
    const [telefono, setTelefono]=useState("");
    const [direccion, setDireccion]=useState("");
    const [error, setError]= useState("");

    const handleRegister = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            console.log({nombreUsuario, correoUsuario, password, telefono, direccion});
            const response = await apiClient.post("/usuario/registrar", {nombreUsuario, correoUsuario, password, telefono, direccion});
            console.log("Usuario registrado:", response.data)
            alert("Usuario registrado correctamente");
        }catch(err){
            if(err.response) {
                setError(err.response.data.mensaje || "Error al registrar");
            }else{
               setError("Error al conectar con el servidor"); 
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Registro de usuario</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text"
                    placeholder="Nombre del usuario"
                    value={nombreUsuario}
                    onChange={(e)=> setNombreUsuario(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    
                />
                <input
                type="email"
                placeholder="Correo electrónico usuario"
                value={correoUsuario}
                onChange={(e) => setcorreo(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="password"
                placeholder="Contraseña usuario"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="Telefono Usuario"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="Dirección usuario"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Registrar usuario
                </button>
            </form>
            </div>
        </div>
    );
};

export default Register;