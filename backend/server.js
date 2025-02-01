const express = require('express');
const dotenv= require('dotenv');
const cors = require('cors');
const bodyParser= require('body-parser');
const conectarBDMongo= require('./src/configuracion/baseDeDatos');
const middlewareAuthentication= require('./src/middleware/authenticMiddleware');


dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5001',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
// Conexión a MongoDB
conectarBDMongo();



app.use('/api/eventos', require('./src/rutes/RutasEventos'));
app.use('/api/usuario', require('./src/rutes/RutasUsuario'));
//middleware para rutas no encontradas

app.use((req, res, next)=>{
    res.status(404).json({mensaje: 'Ruta no encontrada'})
})

// Middleware para manejo de errores
app.use((error, req, res, next)=>{
    console.error(error.stack);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message})
})
// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`servidor ejecutandose en el puerto ${PORT}`);
});