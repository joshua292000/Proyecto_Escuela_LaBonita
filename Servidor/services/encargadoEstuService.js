const express = require("express");
const app = express.Router();

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


const obtenerEncargado= (request, response) => {
    // const cd = request.params.cd;
    //  const id = request.params.id;

   // console.log("Datos "+cd+"  "+ id);
    // const {cedulaPer, idPersona} = request.params;
    connection.query('CALL PRC_ObtenerEncargado( ?, ?, @cedula, @pNombre, @sNombre, '+
                                                '@pApellido, @sApellido, @fechNaci, @estCivil, '+
                                                '@sexo, @nacionalidad, @direccion, @provincia, '+
                                                '@canton, @distrito, @lugarTrabajo, @viveCEstu, '+ 
                                                '@escolaridad, @ocupacion, @parentezco); ' +             
                                        'SELECT  @cedula  as cedula, @pNombre as pNombre, @sNombre as sNombre, '+
                                                '@pApellido as pApellido, @sApellido as sApellido, @fechNaci as fechNaci, @estCivil as estCivil, '+
                                                '@sexo as sexo, @nacionalidad  as nacionalidad, @direccion as direccion, @provincia as provincia, '+
                                                '@canton  as canton, @distrito  as distrito, @lugarTrabajo as lugarTrabajo, @viveCEstu  as viveCEstu, '+ 
                                                '@escolaridad as escolaridad, @ocupacion as ocupacion, @parentezco as parentezco;',                                                   
    [request.params.cd, request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.get("/obtenerEncargado/:cd/:id", obtenerEncargado)


const obtenerContactoEncargado = (request, response) => {
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

app.get("/obtenerConEncargado/:id", obtenerContactoEncargado);


module.exports = app;