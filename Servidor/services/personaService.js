const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Persona
const InsertarPersona = (request, response) => {
    const {cedula, pNombre, sNombre, pApellido, sApellido, fechaNaci, estadoCivil, sexo, 
           lugarNacimiento, provincia, canton, distrito, direccion} = request.body;
    connection.query('CALL PRC_InsertarPersona(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, pNombre, sNombre, pApellido, sApellido, fechaNaci, estadoCivil, sexo, 
     lugarNacimiento, provincia, canton, distrito, direccion],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).send(results[1]);
        }
    });

    //console.log(request.body);
};

//ruta
app.route("/insertarPersona").post(InsertarPersona);

const InsertarContacto = (request, response) => {
    const {cedulaPer, tipoContacto, contacto} = request.body;
    connection.query('CALL PRC_InsertarContactoPersona(?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaPer, tipoContacto, contacto],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
};

//ruta
app.route("/insertarContacto").post(InsertarContacto);

const obtenerContacto = (request, response) => {
    const id = request.params.id;
    connection.query('SELECT c.Cont_Contacto AS contacto, t.Tco_Descripcion AS Tipo '+
                     'FROM esc_contactoper c, esc_tipocontacto t, esc_personas p '+
                     'WHERE c.Tco_Id =t.Tco_Id AND c.Per_Id=p.Per_Id AND p.Per_Id= ?', 
    [id],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
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