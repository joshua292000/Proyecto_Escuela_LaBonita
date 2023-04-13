const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Estudiantes
const InsertarEstudiante = (request, response) => {
    const {cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion} = request.body;
    connection.query('CALL PRC_InsertarEstudiante( ?, ?, ?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
    console.log(request.body);
   // console.log(cedula, viaja, poliza, vencePoliza, imas, grado, adecuacion, descripcion, seccion);
};

//ruta
app.route("/insertarEstudiante").post(InsertarEstudiante);


const AsignarSeccionEstudiante = (request, response) => {
    const {idMatri, seccion, idGrado} = request.body;
    connection.query('CALL PRC_InsertarSeccionEstudiante( ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [idMatri, seccion, idGrado],
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
app.route("/asignarSeccionEstudiante").post(AsignarSeccionEstudiante);



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
                        'esc_adecuacion c, esc_matricula m, esc_seccion s '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id =d.Per_id AND '+
                        'd.Pro_Id = v.Pro_Id AND d.Can_Id = t.Can_Id AND '+
                        'd.Dis_Id = o.Dis_Id AND p.Per_Id = e.Per_Id AND '+
                        'e.Est_Id = a.Est_Id AND a.Ade_Id = c.Ade_Id AND '+
                        'e.Est_Id = m.Est_Id AND m.Sec_Id = s.Sec_Id AND '+
                        's.Gra_Id = g.Gra_Id AND p.Per_Identificacion = ? AND '+
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
app.get("/obtenerEstudiante/:cedula", ObtenerEstudiante);


//Traer los estudiantes de un grado en especifico
const ObtenerEstudianteGrado = (request, response) => {
    connection.query('SELECT p.Per_Identificacion AS cedula, CONCAT(p.Per_PApellido, " ",  p.Per_SApellido, " ", p.Per_PNombre ) as nombre, '+
                      's.Sec_Seccion as seccion, m.Mat_Id as idMatri, g.Gra_Id as idGrado '+
                    'FROM esc_grado g, esc_seccion s, esc_estudiantes e, esc_matricula m, esc_personas p '+
                    'WHERE m.Sec_Id = s.Sec_Id '+
                            'AND s.Gra_Id = g.Gra_Id '+
                            'AND m.Est_Id = e.Est_Id '+
                            'AND e.Per_Id = p.Per_Id '+
                            'AND EXTRACT(YEAR FROM m.Mat_FechaMatricula) = EXTRACT(YEAR FROM CURDATE()) '+
                            'AND g.Gra_Grado=? '+
                            'GROUP BY s.Sec_Seccion, p.Per_Identificacion, p.Per_PNombre, '+
        								'p.Per_PApellido, p.Per_SApellido '+
							'ORDER BY s.Sec_Seccion, p.Per_PApellido ASC;',
    [request.params.grado],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
//ruta
app.get("/ObtenerEstudianteGrado/:grado", ObtenerEstudianteGrado);

module.exports = app;