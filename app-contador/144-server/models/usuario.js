const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String
    },
    pdf: {
        type: String
    },
    curp: {
        type: String,
        default: ''  
    },
    telefono: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    }
})

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);