const mongoose = require('mongoose');

const EventosSchema= new mongoose.Schema({
    nombreEvento: { type: String, required: true},
    fechaEvento: {type: Date, required: true},
    horaEvento:{type: String, required: true},
    ubicacion: {type: String, required: true},
    descripcion: {type: String, required: true}
})

module.exports= mongoose.model('Eventos', EventosSchema);