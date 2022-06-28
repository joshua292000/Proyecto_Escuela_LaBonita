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


const obtenerEstudiante = (request, response) => {
    const {cedulaEst} = request.body;
    connection.query('SELECT p.Per_Identificacion as cedulaEst, p.Per_PNombre, p.Per_SNombre, '+
                        'p.Per_PApellido, p.Per_SApellido, p.Per_FechaNacimiento, '+
                        'p.Per_EstadoCivil, p.Per_Sexo, i.Pais_Nombre, '+
                        'e.Est_Viaja, e.Est_Poliza, s.Sec_Grado, '+
                        'c.Ade_Nombre, g.Per_Id '+    
                    'FROM esc_personas p, esc_pais i,  esc_estudiantes e, '+
                          'esc_encargados g, esc_estudiantes_has_encargados d, '+
                          'esc_seccion s,esc_adecuacion_has_estudiantes a, '+
                         'esc_adecuacion c '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id = e.Per_Id AND '+
                         'e.Sec_Id = s.Sec_Id AND e.Est_Id = a.Est_Id AND a.Ade_Id = c.Ade_Id and '+
                        'e.Est_Id = d.Est_Id AND d.Enc_Id = g.Enc_Id  AND p.Per_Identificacion = ?', 
    [cedulaEst],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Estudiante ingresado correctamente": results});
    });
};

//ruta
app.route("/obtenerEstudiante").get(obtenerEstudiante);



module.exports = app;