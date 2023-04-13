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
    connection.query('SELECT c.Cont_Contacto AS contacto, t.Tco_Descripcion AS Tipo '+
                     'FROM esc_contactoper c, esc_tipocontacto t, esc_personas p '+
                     'WHERE p.Per_Id=c.Per_Id AND c.Tco_Id =t.Tco_Id AND p.Per_Identificacion=?;', 
    [request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/obtenerContactoxcedula/:id", obtenerContactoxcedula);



//Parte de funcionarios
const obtenerFunAsigSeccion = (request, response) => {
    
    connection.query('SELECT f.Func_Id idFun, p.Per_Identificacion cedula, CONCAT(p.Per_PNombre, " ", p.Per_PApellido, " ",  p.Per_SApellido) as nombre, '+
                    'GROUP_CONCAT(DISTINCT m.Mat_Nombre SEPARATOR ", ") as materias, '+
                    'GROUP_CONCAT(DISTINCT CASE WHEN EXTRACT(YEAR FROM s.Sec_FechaCreacion) = EXTRACT(YEAR FROM CURDATE()) THEN c.Sec_Id ELSE NULL END) AS secciones '+
                    'FROM esc_funcionarios f '+
                    'LEFT JOIN esc_personas p ON f.Per_Id = p.Per_Id '+
                    'LEFT JOIN esc_materias_has_funcionarios h ON f.Func_Id = h.Func_Id '+
                    'LEFT JOIN esc_materias m ON h.Mat_Id = m.Mat_Id '+
                    'LEFT JOIN esc_seccion_has_funcionarios c ON f.Func_Id = c.Func_Id '+
                    'LEFT JOIN esc_seccion s ON c.Sec_Id = s.Sec_Id AND EXTRACT(YEAR FROM s.Sec_FechaCreacion) = EXTRACT(YEAR FROM CURDATE()) '+
                    'WHERE f.Fun_Estado = "A" '+
                    'GROUP BY f.Func_Id;', 
    [],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/obtenerFunAsigSeccion", obtenerFunAsigSeccion);


const obtenerGradoSeccion = (request, response) => {
    connection.query('SELECT s.Sec_Id AS idSec, Gra_Grado AS grado, s.Sec_Seccion AS seccion '+
                     'FROM esc_seccion s, esc_grado g '+
                    'WHERE s.Gra_Id = g.Gra_Id AND EXTRACT(YEAR FROM s.Sec_FechaCreacion) = EXTRACT(YEAR FROM CURDATE()) '+
                    'ORDER BY g.Gra_Id;', 
    [],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/obtenerGradoSeccion", obtenerGradoSeccion);


const eliminarSecFuncionario = (request, response) => {
    connection.query('DELETE h FROM esc_seccion_has_funcionarios h '+
                     'LEFT JOIN esc_seccion s ON h.Sec_Id = s.Sec_Id '+
                     'WHERE h.Func_Id = ? AND EXTRACT(YEAR FROM s.Sec_FechaCreacion) = EXTRACT(YEAR FROM CURDATE());', 
    [request.params.idFun],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.delete("/eliminarSecFuncionario/:idFun", eliminarSecFuncionario);


const InsertarSeccionFuncionario = (request, response) => {
    const {idFun, idSec} = request.body;
    connection.query('CALL PRC_InsertarSeccionFuncionario(?, ?, @msjError); SELECT @msjError AS error;', 
    [idFun, idSec],
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
app.route("/insertarSecFun").post(InsertarSeccionFuncionario);


module.exports = app;