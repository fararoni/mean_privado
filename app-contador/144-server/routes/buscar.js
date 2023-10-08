const { Router } = require('express');
const { getBuscar, getDocumentos } = require('../controllers/buscar');
const { validarToken } = require('../middlewares/validarjwt');

const router = Router();

router.get('/:buscar', validarToken, getBuscar);
router.get('/coleccion/:tabla/:buscar', validarToken, getDocumentos);


module.exports = router;