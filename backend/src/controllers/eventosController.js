const Eventos= require('../models/eventos');

exports.crearEvento= async(req, res) =>{
    try{
        const nuevoEvento = new Eventos(req.body);
        await nuevoEvento.save();
        res.status(201).json(nuevoEvento);
    }catch(error){
        res.status(500).json({ mensaje: "Error al crear el evento ", error: error.message});
    }
};

exports.filtarEventoUbicacion =async(req, res)=>{
    try{
        const filtrarUbicacion= await Eventos.find({"ubicacion": req.params.ubicacion});
        res.status(200).json(filtrarUbicacion)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al filtrar ubicacion', error: error.message})
    }
}
exports.filtarEventoFecha =async(req, res)=>{
    try{
        const{fechaInicio, fechaFinal}= req.params;
        const inicio= new Date(fechaInicio)
        const fin= new Date(fechaFinal)
        if(isNaN(inicio) || isNaN(fin)){
            return res.status(400).json({ error: ' fechas invalidas. Use el formato YYYY-MM-DD '})
        }
        const filtrarFecha= await Eventos.find({fechaEvento:{
            $gte: inicio,
            $lte: fin,
        }, })
        res.status(200).json(filtrarFecha);
    }catch(error){
        res.status(500).json({ mensaje: 'Error al filtrar el eventos por fecha', error: error.message})
    }
}

exports.listarEventos= async(req, res)=>{
    try{
        const listarEventos = await Eventos.find()
        res.status(200).json(listarEventos)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al listar los eventos', error: error.message})
    }
};
exports.ObtenerEvento= async(req, res)=>{
    try{
        const listarEventos = await Eventos.find(req.params.id)
        res.status(200).json(listarEventos)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al listar los eventos', error: error.message})
    }
};

exports.modificarEvento = async(req, res) =>{
    try{
        const eventoModificado = await Eventos.findByIdAndUpdate(req.params.id, req.body,  {new: true});
        res.status(200).json(eventoModificado)
    }catch(error){
        res.status(500).json({ mensaje: 'Error al modificar el evento', error: error.message})
    }
};

exports.eliminarEvento = async (req, res) => {
    try{
        await Eventos.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'evento eliminado con exito'})
    }catch(error){
    res.status(500).json({mensaje: 'Error al eliminar el evento', error: error.message})   
    }
}