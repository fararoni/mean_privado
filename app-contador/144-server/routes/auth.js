const { Router } = require('express');
const { login, renovarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validaciones');
const { validarToken } = require('../middlewares/validarjwt');
const router = Router();

router.post('/', 
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'Agregue un password').not().isEmpty(),
        validarCampos
    ], 
    login
);

router.get('/renovartoken', validarToken, renovarToken );

module.exports = router;