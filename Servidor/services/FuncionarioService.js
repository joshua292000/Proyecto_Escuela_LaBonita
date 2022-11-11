const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");


const Loggin = (request, response) => {
    const usuario = request.params.usuario;
    const clave = request.params.clave;

    connection.query('SELECT u.Usu_Usuario, u.Usu_Clave, f.Func_Id '+
                    'FROM esc_funcionarios f, esc_usuarios u '+
                    'WHERE f.Usu_Id=u.Usu_Id AND u.Usu_Usuario=? AND u.Usu_Clave=?',
    [usuario, clave],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

const Obtener_Secciones = (request, response) => {
    //const Sec_Grado = request.params.Sec_Grado;
    //const Sec_Seccion = request.params.Sec_Seccion;

    connection.query('SELECT s.Sec_Grado AS grado, s.Sec_Seccion AS seccion '+
                    'FROM esc_funcionarios f, esc_seccion s '+
                    'WHERE f.Func_Id=s.Func_Id AND f.Func_Id=?',
    [request.params.Func_Id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.get("/loggin/:usuario/:clave",Loggin);
app.get("/Constancia/:Func_Id",Obtener_Secciones);

module.exports = app;