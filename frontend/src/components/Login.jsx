import {useState} from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import {Link} from "react-router-dom"
const Login =()=>{
    const [correoUsuario, setCorreo]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");
    const navigate= useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError("");
        try{
            const response = await apiClient.post("/usuario/login", {
                correoUsuario: correoUsuario,
                password,
            });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "usuario",
                JSON.stringify({ nombreUsuario: response.data.nombreUsuario })
            );
            navigate("/evento");
        }catch(err){
            if (err.response) {
                setError(err.response.data.mensaje || "Error al logear el usuario");
            }else{
                setError("Error al conectar con el servidor");
            }
        }
    };
    return(
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-4"> Login Usuario</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Correo electronico"
                        value={correoUsuario}
                        onChange={(e)=> setCorreo(e.target.value)}
                        className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Login
                        </button>
                        <p className="mt-4 text-center text-gray-600">Aun no te haz registrado?
                            <Link to="/registrar" className="text-blue-500 hover:underline">Registrate</Link>
                        </p>
                </form>
            </div>
        </div>
    );
};

export default Login;