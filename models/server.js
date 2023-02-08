const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');     //llamando la base de datos

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT            //el puerto del server
        this.usuariosPath = '/api/usuarios';    //es la ruta del server 

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();                    //Guardar datos en la DB (Data base / Base de datos)
    }

    middlewares() {

        // CORS
        this.app.use( cors() )

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') )

    }

    routes() {
        
        this.app.use( this.usuariosPath , require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        } );
    }

}





module.exports = Server;