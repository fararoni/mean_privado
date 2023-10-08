const { Router } =  require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { validarToken } = require('../middlewares/validarjwt');
const { getDocumentos, getDocumentosID, getMisDocumentos, crearDocumento, editarDocumento, actualizarDocumento, eliminarDocumento } = require('../controllers/documentos');

const router = Router();

router.get('/', getDocumentos );

router.get('/editar-documento/:id', getDocumentosID);
router.get('/mis-documentos/:id', getMisDocumentos);

//CREAR DOCUMENTO
router.post('/',
            [
                check('nombre', "El nombre del documento es requerido").not().isEmpty(),
                validarCampos,
                validarToken
            ], crearDocumento);

//ACTUALIZAR DOCUMENTO DESPUES DE CREAR EL DOCUMENTO
    router.put('/:id',
                [
                    check('nombre', "El nombre del documento es requerido").not().isEmpty(),
                    validarCampos,
                    validarToken
                ], actualizarDocumento);

//ACTUALIZAR DOCUMENTO SELECCIONADO        
router.put('/editar-documento/:id',
                [
                    check('nombre', "El nombre del documento es requerido").not().isEmpty(),
                    validarCampos,
                    validarToken
                ], editarDocumento);

//ELIMINAR EL DOCUMENTO SELECCIONADO
router.delete('/:id', eliminarDocumento);

module.exports = router;