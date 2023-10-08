const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarPDF } = require('../helpers/actualizar-pdf');

const fileUpload = (req, res = response) => {
    
    const coleccion = req.params.coleccion;
    const id = req.params.id;

    //Validar coleccion
    const validarColeccion = ['documentos', 'usuarios'];

    if( !validarColeccion.includes(coleccion) ){
        return res.status(400).json({
            ok: false,
            msg: 'No existe la coleccion'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No existe archivo'
        })
    }

    //Acortar el nombre con la extension
    const file = req.files.pdf;
    
    const acortarNombre = file.name.split('.');
    const extesiondelArchivo = acortarNombre[ acortarNombre.length - 1];
    
    // Validar la exntesion
    const validarExtensiones = ['pdf', 'xml', 'zip', 'rar'];

    if( !validarExtensiones.includes(extesiondelArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una válida, favor de añadir pdf,xml,zip o rar'
        })
    }
    
    //generador del identicador con uuid
    const nombredelArchivo = `${ uuidv4() }.${extesiondelArchivo }`;

    //path
    const path = `./uploads/${coleccion}/${nombredelArchivo}`;

    file.mv(path, (err) => {
        if (err)
          return res.status(500).json({
              ok: false,
              msg: 'Error de en la ruta'
          });
    
        //Actualizar PDF
        actualizarPDF(coleccion, id, nombredelArchivo);

        res.json({
            ok: true,
            msg: 'Archivo en ruta',
            nombredelArchivo
        });
      });
      
}

const retornarPDF = (req, res = response) => {
    const coleccion = req.params.coleccion;
    const pdf = req.params.pdf;

    const pathPDF = path.join( __dirname, `../uploads/${ coleccion}/${pdf}`);

    if( fs.existsSync( pathPDF ) ) {
        res.sendFile( pathPDF );
    } else {
        const pathPDF = console.log('No encontre archivo');
        res.sendFile( pathPDF);
    }

}

module.exports = {
    fileUpload,
    retornarPDF
}