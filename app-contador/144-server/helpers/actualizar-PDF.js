const fs = require('fs');
const Documento = require('../models/documento');

const borrarPDF = ( path ) => {
    if( fs.existsSync(path) ) {
        //sustituir pdf
        fs.unlinkSync(path);
    }
}

const actualizarPDF = async( coleccion, id, nombredelArchivo) => {
    
    let pathAnterior = '';

    switch( coleccion ) {
        case 'documentos':
            const documento = await Documento.findById(id);
            if( !documento ) {
                console.log('No encontro el documento por id');
                return false;
            }

            pathAnterior = `./uploads/documentos/${ documento.pdf }`;
            borrarPDF(pathAnterior);

            documento.pdf = nombredelArchivo;
            await documento.save();

            return true;

        break;
    }

}


module.exports = {
    actualizarPDF
}