const express = require('express');
const router= express.Router();
const controladorUsuario = require('../controllers/usuarioController')
const middlewareAuthentication= require('../middleware/authenticMiddleware')
router.post('/registrar', controladorUsuario.registarNuevoUsuario);
router.post('/login', controladorUsuario.loginUsuario);
router.get('/', controladorUsuario.listadoUsuario);
router.put('/:id', controladorUsuario.modificarUsuario);
router.delete('/:id', controladorUsuario.eliminarUsuario);

module.exports= router;