const jwt= require('jsonwebtoken');

const middlewareAuthentication = (req, res, next) =>{
   try{
    console.log('Headers recibidos:', req.headers);
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({mensaje: 'Se requiere token de autenticacion'})
    }
    const token = authHeader.split(' ')[1];
    consol.log('Token extraído:', token)
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded)=>{
        if(error){
            return res.status(401).json({ mensaje: 'Token invalido', error: error.message })
        }
        req.user =decoded;
        next();
    });
    console.log('Token recibido:', token);
    next();
}catch(error){
        console.error('Error en la autorizacion', error.message);
};}
module.exports= middlewareAuthentication;
