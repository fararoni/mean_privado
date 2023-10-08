const { response } = require('express');
const Usuario = require('../models/usuario');
const Documento = require('../models/documento');

const getBuscar = async(req, res = response ) => {

    const buscar = req.params.buscar;
    const regExp = new RegExp( buscar, 'i');

    const [ usuarios, documentos ] = await Promise.all([
        Usuario.find( {nombre: regExp} ),
        Documento.find( {nombre: regExp} )
    ]);

    res.json({
        ok: true,
        msg: 'Todo esta bien en buscar',
        buscar,
        usuarios,
        documentos
    })
}

const getDocumentos = async(req, res = response ) => {

    const tabla = req.params.tabla;
    const buscar = req.params.buscar;
    const regExp = new RegExp( buscar, 'i');

    let data = [];

    switch (tabla) {
        case 'documentos':
            data = await Documento.find( {nombre: regExp} )                            
            break;
        case 'usuarios':
            data = await Usuario.find( {nombre: regExp} )
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser de documentos o usuarios'
            });
    }

    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getBuscar,
    getDocumentos
}