const { response } = require('express');
const Documento = require('../models/documento');

const getDocumentos = async(req, res = response) => {
   
    const documentos = await Documento.find().populate('usuario', 'nombre fecha pdf');

    res.json({
        ok: true,
        documentos
    })
}

const getDocumentosID = async(req, res = response) => {

    const id = req.params.id;

    try {

        const documentos = await Documento.findById(id).populate('usuario', 'nombre fecha pdf')
        
        res.json({
            ok: true,
            documentos
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error Fatal'
        })
    }
}

const getMisDocumentos = async(req, res = response) => {
    const id = req.params.id;

    try {

        const documentos = await Documento.find({ usuario: id }).populate('usuario', 'nombre fecha pdf')
        
        res.json({
            ok: true,
            documentos
        })

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Error Fatal'
        })
    }
}

const crearDocumento = async(req, res = response) => {
    
    const uid = req.uid;

    const documento = new Documento({
        usuario: uid,
        ...req.body
    })
    
    console.log(documento)

    try {

        //Salvar documento en la DB
        const documentoDB = await documento.save();

        res.json({
            ok: true,
            documento: documentoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Fatal error'
        })
    }
    
}

//ACTUALIZAR DOCUMENTO SELECCIONADO 
const editarDocumento = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const documento = await Documento.findById( id );

        if( !documento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Documento no encontrado'
            });
        }

        //Actualizar el nombre

        const cambiosdelDocumento = {
            ...req.body,
            usuario: uid
        }

        const documentoActualizado = await Documento.findByIdAndUpdate( id, cambiosdelDocumento, { new: true });        
        
        res.json({
            ok: true,
            documento: documentoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error fatal'
        })
    }
}

//ACTUALIZAR DOCUMENTO DESPUES DE CREAR EL DOCUMENTO
const actualizarDocumento = async (req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;

    try {

        const documento = await Documento.findById( id );

        if( !documento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Documento no encontrado'
            });
        }

        //Actualizar el nombre

        const cambiosdelDocumento = {
            ...req.body,
            usuario: uid
        }

        const documentoActualizado = await Documento.findByIdAndUpdate( id, cambiosdelDocumento, { new: true });        
        
        res.json({
            ok: true,
            documento: documentoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error fatal'
        })
    }
}

//ELIMINAR EL DOCUMENTO SELECCIONADO
const eliminarDocumento = async(req, res = response) => {
    
    const uid = req.params.id;

    try {

        const existeDocumentoDB = await Documento.findById( uid );

        if( !existeDocumentoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe documento con ese ID'
            })
        }

        //Eliminacion del documento
        
        await Documento.findByIdAndDelete( uid )

        res.json( {
            ok: true,
            documento: 'Documento Eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo ocurrio mal'
        })
    }
    
    
}

module.exports = {
    getDocumentos,
    getDocumentosID,
    getMisDocumentos,
    crearDocumento,
    editarDocumento,
    actualizarDocumento,
    eliminarDocumento
}