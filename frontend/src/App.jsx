import {Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Eventos from "./components/Eventos";
import CrearEvento from "./components/CrearEvento"
import ModificarEvento from "./components/modificarEvento";
import './App.css'
import 'vite/modulepreload-polyfill'

function App() {
return (
    <>
     <div>
      <Header/>
      <Routes>
        <Route path="/" element ={ <Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path= "/registrar" element= {< Register/>}/>
        <Route path= "/evento" element={<Eventos/>}/>
        <Route path= "/CrearEvento" element={<CrearEvento/>}/>
        <Route path="/modificarEvento/:id" element={<ModificarEvento/>}/>
      </Routes>
     </div>
    </>
  )
}

export default App
