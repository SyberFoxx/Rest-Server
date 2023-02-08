const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');




const usuariosGet= async (req = request, res = response) => {
    
    // paginacion en el GET, desde y limite de paginas para mostrar los usuarios almacenados en la BD
   // const { q, nombre = "No name", apikey, page, limit} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ]= await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number( desde ))
            .limit(Number(limite))
    
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    
    const {id} = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json(usuario);
}

const usuariosPost = async (req, res = response) => {
    
    
    const { nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    // Guardar en BD (Base de datos)
    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosDelete = async (req, res= response) => {
    
    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    //inahbilitar usuario sin borrarlo de la base de datos
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario);
}


const usuariosPatch = (req, res) => {
    
    res.json({
        msg: 'patch API - usuariosPatch'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}