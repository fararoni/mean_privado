const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { validarToken } = require('../middlewares/validarjwt');
const { fileUpload, retornarPDF } = require('../controllers/upload');

const router = Router();

router.use(expressfileUpload());

router.put('/:coleccion/:id', validarToken, fileUpload);

router.get('/:coleccion/:pdf', retornarPDF);

module.exports = router;