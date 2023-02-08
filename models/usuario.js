
const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },

    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
        
    },

    img: {
        type: String,
        
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] 
    },

    estado: {
        type: Boolean,
        default: true 
    },

    google: {
        type: Boolean,
        default: false
    },
});

//eliminar datos que aparecen al crearse el usuario en la base de datos
//esta funcion con .this borra la __version en pantalla y la contraseña
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}



module.exports = model( 'Usuario', UsuarioSchema )