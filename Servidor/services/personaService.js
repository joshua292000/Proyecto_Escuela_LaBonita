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

const obtenerContacto = (request, response) => {
    const id = request.params.id;
    connection.query('SELECT c.Cont_Contacto AS contacto, t.Tco_Descripcion AS Tipo '+
                     'FROM esc_contactoper c, esc_tipocontacto t, esc_personas p '+
                     'WHERE c.Tco_Id =t.Tco_Id AND c.Per_Id=p.Per_Id AND p.Per_Id= ?', 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/obtenerContacto/:id", obtenerContacto);

const obtenerContactoxcedula = (request, response) => {
    const id = request.params.id;
    connection.query('SELECT c.Cont_Contacto AS contacto, t.Tco_Descripcion AS Tipo '+
                     'FROM esc_contactoper c, esc_tipocontacto t, esc_personas p '+
                     'WHERE p.Per_Id=c.Per_Id AND c.Tco_Id =t.Tco_Id AND p.Per_Identificacion=?;', 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/obtenerContactoxcedula/:id", obtenerContactoxcedula);
module.exports = app;