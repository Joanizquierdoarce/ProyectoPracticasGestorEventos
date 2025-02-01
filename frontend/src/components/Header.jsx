import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () =>{
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado){
            setUsuario(JSON.parse(usuarioGuardado))
        }
    }, []);

    const handleLogout= () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
        navigate("/login");
    };
    const CrearEvento= () =>{
        navigate("/crearEvento");
    };
    const modificarEvento= () =>{
        const eventoId = prompt("Ingrese el ID del evento a modificar:");
        if (eventoId) {
            console.log("Navegando a:", `/modificarEvento/${eventoId}`); // Debug
            navigate(`/modificarEvento/${eventoId}`);
        } else {
            alert("Debe ingresar un ID válido.");
        }
    };
    return(
        <header className="bg-gray-800 text-white py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">Gestor de eventos</h1>
                <div className="flex space-x-6 items-center">
                {usuario && location.pathname === "/evento" && (
                    <div className="flex space-x-6">
                    <button
                        onClick={CrearEvento}
                        className="text-green-400 hover:text-green-300 font-semibold" >
                           ➕ Crear evento
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                        onClick={modificarEvento}
                        className="text-blue-400 hover:text-blue-300 font-semibold">
                           ✏️ Modificar Evento
                    </button>
                    </div>
                )}
                    { usuario ?  (//mostrar solo en /evento}
                        <>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faUser} className="text-gray-300"/>
                            <span className="text-gray-300">{usuario.nombreUsuario}</span>
                        </div>
                        <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-300 ml-4">
                          ❌  Cerrar Sesión
                        </button>
                        </>
                        ): (
                            <Link to="/login" className="hover:text-gray-300">
                              🔑 Iniciar Sesión 
                            </Link>
                        )}
                </div>
            </nav>
        </header>
    );
};

export default Header;