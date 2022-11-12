const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");


const insertarPersona = (request, response) => {
    const {cedula, pNombre, sNombre, pApellido, sApellido, fechNaci, estCivil, sexo, 
           estado, nacionalidad, nomProvincia, nomCanton, nomDistrito, direccion} = request.body;
    connection.query('CALL PRC_InsertarPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, pNombre, sNombre, pApellido, sApellido, fechNaci, estCivil, sexo, 
    estado, nacionalidad, nomProvincia, nomCanton, nomDistrito, direccion],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarPersona").post(insertarPersona);

const insertarContacto = (request, response) => {
    const {cedulaPer, tipoContacto, contacto} = request.body;
    connection.query('CALL PRC_InsertarContactoPersona(?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaPer, tipoContacto, contacto],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarContacto").post(insertarContacto);

module.exports = app;