const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

const insertarEstudiante = (request, response) => {
    const {huellaDigi, viaja, poliza, fecVenPoliza, imas, cedulaPer, seccion} = request.body;
    connection.query('CALL PRC_InsertarEstudiante(?, ?, ?, ?, ?, ?, ?)', 
    [huellaDigi, viaja, poliza, fecVenPoliza, imas, cedulaPer, seccion],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Estudiante ingresado correctamente": results.affectedRows});
    });
};

//ruta
app.route("/insertarEstudiante")
.post(insertarEstudiante);

module.exports = app;