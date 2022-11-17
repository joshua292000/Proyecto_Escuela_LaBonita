const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Estudiantes
const InsertarEstudiante = (request, response) => {
    const { viaja, poliza, fecVenPoliza, imas, cedulaPer, seccion} = request.body;
    connection.query('CALL PRC_InsertarEstudiante( ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [huellaDigi, viaja, poliza, fecVenPoliza, imas, cedulaPer, seccion],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarEstudiante").post(InsertarEstudiante);


const ObtenerEstudiante = (request, response) => { 
    connection.query('SELECT p.Per_Id id, p.Per_Identificacion cedula, p.Per_PNombre pNombre, p.Per_SNombre sNombre, '+
                     'p.Per_PApellido pApellido, p.Per_SApellido sApellido, '+
                    'DATE_FORMAT(p.Per_FechaNacimiento, "%Y-%m-%d")  as fechaNaci, '+
                     'p.Per_Sexo sexo, i.Pais_Nombre lugarnacimiento, d.Dir_Direccion direccion, '+
                     'v.Pro_Nombre provincia, t.Can_Nombre canton, o.Dis_Nombre distrito, '+
                     'e.Est_Viaja viaja, e.Est_Poliza poliza, s.Sec_Grado grado, c.Ade_Nombre adecuacion, '+
                     'GROUP_CONCAT( h.Enc_Id  SEPARATOR "-") encargados '+
                    'FROM esc_personas p, esc_pais i, esc_direccion d, '+
                     'esc_provincia v, esc_canton t, esc_distrito o, '+
                     'esc_estudiantes e, esc_seccion s, esc_adecuacion_has_estudiantes a, '+
                     'esc_adecuacion c, esc_estudiantes_has_encargados h, esc_matricula m '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id =d.Per_id AND '+
                    'd.Pro_Id = v.Pro_Id AND d.Can_Id = t.Can_Id AND '+
                    'd.Dis_Id = o.Dis_Id AND p.Per_Id = e.Per_Id AND '+
                     'e.Sec_Id = s.Sec_Id AND e.Est_Id = a.Est_Id AND a.Ade_Id = c.Ade_Id AND '+
                    'e.Est_Id = m.Est_Id AND p.Per_Id = h.Per_Id AND p.Per_Identificacion = ? AND '+
                    ' h.Ehe_estado = "A" AND '+
                     'm.Matri_FechaMatricula = (SELECT MAX(m.Matri_FechaMatricula) FROM esc_personas p, '+
                    'esc_estudiantes e, esc_matricula m '+
                   'WHERE p.Per_Id = e.Per_Id AND e.Est_Id = m.Est_Id AND p.Per_Identificacion = ?);',
    [request.params.cedula, request.params.cedula],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.get("/obtenerEstudiante/:cedula",ObtenerEstudiante);



module.exports = app;