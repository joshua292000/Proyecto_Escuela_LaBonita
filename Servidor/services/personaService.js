const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");


const insertarPersona = (request, response) => {
    const {cedula, pNombre, sNombre, pApellido, sApellido, fechNaci, estCivil, sexo, estado, idDirec, idNacio} = request.body;
    connection.query('CALL PRC_InsertarPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, pNombre, sNombre, pApellido, sApellido, fechNaci, estCivil, sexo, estado, idDirec, idNacio],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarPersona")
.post(insertarPersona);

module.exports = app;