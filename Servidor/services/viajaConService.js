const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta la persona viaja con
const InsertarViajaCon = (request, response) => {
    const {cedulaEst, cedula, pNombre, sNombre, pApellido, sApellido, estado} = request.body;
    connection.query('CALL PRC_InsertarViajaCon( ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaEst, cedula, pNombre, sNombre, pApellido, sApellido, estado],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
   // console.log(request.body);
};

//ruta
app.route("/insertarViajaCon").post(InsertarViajaCon);

const ObtenerViajaCon = (request, response) => {
    connection.query('SET @cedula = ?; '+
                      'CALL PRC_ObtenerViajaCon( @cedula, @pNombre, @sNombre, @pApellido, @sApellido, @msjError); '+
                      'SELECT @cedula as cedula, @pNombre as pNombre, @sNombre as sNombre, '+
                      '@pApellido as pApellido, @sApellido as sApellido, @msjError AS error;', 
    [request.params.cd],
    (error, results) => {
        if(error)
            throw error;
        
        //se retorna la posición 2 porque retorna un arreglo de 3. Esto por usar la variable de inout
        response.status(201).json(results[2]);
    });
};

//ruta
app.get("/obtenerViajaCon/:cd", ObtenerViajaCon);


const ObtenerPersonasViajaCon = (request, response) => {
    connection.query('CALL PRC_ObtenerPersonasViajaCon(?);', 
    [request.params.id],
    (error, results) => {
        if(error)
            throw error;
        //se retorna la posición 2 porque retorna un arreglo de 3. Esto por usar la variable de inout
        response.status(201).json(results);
    });
};

//ruta
app.get("/ObtenerPersonasViajaCon/:id", ObtenerPersonasViajaCon);

module.exports = app;