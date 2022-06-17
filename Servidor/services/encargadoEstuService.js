const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

const insertarEncargadoEstudiante = (request, response) => {
    const {cedulaEncar, cedulaEst} = request.body;
    connection.query('CALL PRC_InsertarEncargado(?, ?)', 
    [cedulaEncar, cedulaEst],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Encarga del estudiante ingresado correctamente": results.affectedRows});
    });
};

//ruta
app.route("/insertarEncargado")
.post(insertarEncargadoEstudiante);

module.exports = app;