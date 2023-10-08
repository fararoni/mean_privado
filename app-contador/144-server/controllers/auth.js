const bcrypt = require('bcryptjs/dist/bcrypt');
const { response } = require('express');
const { crearToken } = require('../helpers/jwt');
const { getMenu } = require('../helpers/menu');
const Usuario = require('../models/usuario');
const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne( { email } );
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Correo no Válido'
            })
        }

        //Verificar password
        const passwordDB = await bcrypt.compareSync( password, usuarioDB.password );
        if( !passwordDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // Token generado
        const token = await crearToken( usuarioDB.id );

        res.json({
            ok: true,
            msg: 'Estoy logeado',
            usuarioDB,
            token,
            menu: getMenu( usuarioDB.role)
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Favor de hablar con el administrador'
        })
    }
}

const renovarToken = async( req, res = response ) => {
    const uid = req.uid;

    //Generar token 
    const token = await crearToken( uid );

    //Obtencion del usuario
    const usuario = await Usuario.findById( uid );

    res.json({
        ok: true,
        token,
        usuario,
        menu: getMenu( usuario.role)
    })
}

module.exports = {
    login,
    renovarToken
}