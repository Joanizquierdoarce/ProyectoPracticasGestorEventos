const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_para_jwt';

// registrar nuevo usuario
exports.registarNuevoUsuario= async(req,res) =>{
    try{
        const { nombreUsuario, correoUsuario, password, telefono, direccion}= req.body;

        if (!nombreUsuario || !correoUsuario || !password || !telefono || !direccion) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }
        //verificar si el usuario existe
        const usuarioExistente = await Usuario.findOne({ correoUsuario });
        if(usuarioExistente){
            return res.status(400).json({ mensaje: 'El correo ya esta en uso'});
        }

        //Encriptar la contraseña
        const EncriptarPassword = await bcrypt.hash(password, 10);

        //Crear un nuevo usuario
        const nuevoUsuario =new Usuario({
            nombreUsuario,
            correoUsuario,
            password: EncriptarPassword,
            telefono,
            direccion 
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado con éxito'});
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error al registrar el usuario ', error: error.message})
    }
};

exports.loginUsuario = async (req, res)=>{
    try{
        const { correoUsuario, password }= req.body;

        //verificar si el usuario existe
        const usuario = await Usuario.findOne({ correoUsuario });
        if(!usuario){
            return res.status(400).json({mensaje: 'Correo o contraseña incorrectos'});
        }

        //verificar la contraseña
        const esPasswordValido = await bcrypt.compare(password, usuario.password);
        if(!esPasswordValido){
            return res.status(400).json({mensaje: 'Correo o contraseña incorrectos'});
        }
        const token = jwt.sign({ id: usuario._id}, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ mensaje: 'Login exitoso', token})
    }catch(error){
        res.status(500).json({ mensaje: 'Error al intentar logear', error: error.message})
    }
};
exports.listadoUsuario = async (req, res) =>{
    try{
        const obtenerUsuarios = await Usuario.find();
        res.status(200).json(obtenerUsuarios);
    }catch(error){
        res.status(500).json({ mensaje: 'Error al obtener usuario', error: error.message});
    }
}
exports.modificarUsuario= async( req,res) =>{
    try{
        const usuarioModificado=  await Usuario.findByIdAndUpdate(req.params.id, req.body, {new :true});      
        res.status(200).json(usuarioModificado);
    }catch(error){
        res.status(500).json({ mensaje: 'Error al actualizar el Usuario', error: error.message});
    }
}
exports.eliminarUsuario= async(req, res)=>{
    try{
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente'})

    }catch(error){
        res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message})
    }
}
