const express = require('express');
const router = express.Router();
const EventosController= require('../controllers/eventosController');

router.post('/', EventosController.crearEvento);
router.get('/', EventosController.listarEventos);
router.get('/:ubicacion', EventosController.filtarEventoUbicacion);
router.get('/:fechaInicio/:fechaFinal', EventosController.filtarEventoFecha);
router.get('/:id', EventosController.ObtenerEvento);
router.put('/:id', EventosController.modificarEvento);
router.delete('/:id', EventosController.eliminarEvento);

module.exports = router;