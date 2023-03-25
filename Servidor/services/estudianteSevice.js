const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Estudiantes
const InsertarEstudiante = (request, response) => {
    const {cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion, seccion} = request.body;
    connection.query('CALL PRC_InsertarEstudiante( ?, ?, ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion, seccion],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
   // console.log(cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion, seccion);
    
};

//ruta
app.route("/insertarEstudiante").post(InsertarEstudiante);


const ObtenerEstudiante = (request, response) => { 
    connection.query('SELECT e.Est_Id id, p.Per_Identificacion cedula, p.Per_PNombre pNombre, p.Per_SNombre sNombre, '+
                        'p.Per_PApellido pApellido, p.Per_SApellido sApellido, '+
                        'DATE_FORMAT(p.Per_FechaNacimiento, "%Y/%m/%d")  as fechaNaci, '+
                        'p.Per_Sexo sexo, i.Pais_Nombre lugarNacimiento, d.Dir_Direccion direccion, '+
                        'v.Pro_Nombre provincia, t.Can_Nombre canton, o.Dis_Nombre distrito, '+
                        'm.Mat_Viaja viaja, m.Mat_Poliza poliza, m.Mat_Imas imas, '+
                        'DATE_FORMAT(m.Mat_FecVenPoliza, "%Y/%m/%d")  as vencePoliza, '+
                        'g.Gra_Grado grado, c.Ade_Nombre adecuacion, a.AEst_Descripcion descripcion '+
                    'FROM esc_personas p, esc_pais i, esc_direccion d, '+
                        'esc_provincia v, esc_canton t, esc_distrito o, '+
                        'esc_estudiantes e, esc_grado g, esc_adecuacion_has_estudiantes a, '+
                        'esc_adecuacion c, esc_matricula m '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id =d.Per_id AND '+
                        'd.Pro_Id = v.Pro_Id AND d.Can_Id = t.Can_Id AND '+
                        'd.Dis_Id = o.Dis_Id AND p.Per_Id = e.Per_Id AND '+
                        'e.Est_Id = a.Est_Id AND a.Ade_Id = c.Ade_Id AND '+
                        'e.Est_Id = m.Est_Id AND m.Gra_id = g.Gra_Id AND p.Per_Identificacion = ? AND '+
                        'm.Mat_FechaMatricula = (SELECT MAX(m.Mat_FechaMatricula) FROM esc_personas p, '+
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