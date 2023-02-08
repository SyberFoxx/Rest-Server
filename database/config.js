const mongoose = require('mongoose');
const express = require("express");
const app = express();

const dbConnection = async() => {

    try {

        mongoose.set('strictQuery', false);
        const mongoURI = `mongodb+srv://${process.env.USER}:${process.env.PASS}@miclustercafe.xso72x3.mongodb.net/prueba`;


        await mongoose.connect(mongoURI,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          

        });

        console.log('Base de datos Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }



}


module.exports = {
    dbConnection,
}