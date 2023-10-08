const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarToken = (req, res = response, next) => {
    
    //Leer token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.secretPrivateKey);
        req.uid = uid
        next();

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarToken
}