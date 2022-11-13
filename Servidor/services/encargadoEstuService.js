const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

const insertarEncargadoEstudiante = (request, response) => {
    const {cedulaEncar, cedulaEst} = request.body;
    connection.query('CALL PRC_InsertarEncargado(?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaEncar, cedulaEst],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarEncargado")
.post(insertarEncargadoEstudiante);


const obtenerEncargado= (request, response) => {
    // const cd = request.params.cd;
    //  const id = request.params.id;
   // console.log("Datos "+cd+"  "+ id);
    // const {cedulaPer, idPersona} = request.params;
    connection.query('CALL PRC_ObtenerEncargado( ?, ?, @cedula, @pNombre, @sNombre, '+
                                                '@pApellido, @sApellido, @fechNaci, @estCivil, '+
                                                '@sexo, @nacionalidad, @direccion, @provincia, '+
                                                '@canton, @distrito, @lugarTrabajo, @viveCEstu, '+ 
                                                '@escolaridad, @ocupacion, @parentezco, @msjError); ' +             
                                        'SELECT  @cedula  as cedula, @pNombre as pNombre, @sNombre as sNombre, '+
                                                '@pApellido as pApellido, @sApellido as sApellido, @fechNaci as fechNaci, @estCivil as estCivil, '+
                                                '@sexo as sexo, @nacionalidad  as nacionalidad, @direccion as direccion, @provincia as provincia, '+
                                                '@canton  as canton, @distrito  as distrito, @lugarTrabajo as lugarTrabajo, @viveCEstu  as viveCEstu, '+ 
                                                '@escolaridad as escolaridad, @ocupacion as ocupacion, @parentezco as parentezco, @msjError AS error;',                                                   
    [request.params.cd, request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.get("/obtenerEncargado/:cd/:id", obtenerEncargado)





module.exports = app;