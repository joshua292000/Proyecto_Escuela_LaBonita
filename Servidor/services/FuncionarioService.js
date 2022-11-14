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

const obtenerFuncionario = (request, response) => {
    // const {cedula} = request.body;
     
     connection.query('SELECT p.Per_Identificacion AS cedula, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, '+ 
                      'p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido, DATE_FORMAT(p.Per_FechaNacimiento, "%Y-%m-%d")  as fechaNaci, '+ 
                      'p.Per_EstadoCivil AS EstadoCivil, p.Per_Sexo AS Sexo, i.Pais_Nombre AS Pais, d.Dir_Direccion AS Direccion, '+ 
                      'v.Pro_Nombre AS Provincia, t.Can_Nombre AS Canton, o.Dis_Nombre AS Distrito, f.Func_Escolaridad AS Escolaridad, '+
                      'f.Func_AniosLaborados AS Experiencia,DATE_FORMAT(f.Fun_FechaIngreso, "%Y-%m-%d")  as fechaIngre,f.Fun_Foto AS Foto, '+
                      'f.Fun_Descripcion AS Descripcion, n.Ins_Nombre AS Institucion '+ 
                      'FROM esc_personas p, esc_pais i, esc_direccion d, '+ 
                      'esc_provincia v, esc_canton t, esc_distrito o, '+ 
                      'esc_funcionarios f, esc_institucion n '+ 
                      'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id =d.Per_id AND '+ 
                      'd.Pro_Id = v.Pro_Id AND d.Can_Id = t.Can_Id AND '+ 
                      'd.Dis_Id = o.Dis_Id AND p.Per_Id = f.Per_Id AND f.Ins_Id= n.Ins_Id '+ 
                      'AND p.Per_Identificacion = ?;', 
     [request.params.cedula],
     (error, results) => {
         if(error)
             throw error;
         response.status(201).json(results);
     });
 };
 
 //ruta
 app.get("/obtenerFuncionario/:cedula",obtenerFuncionario);
  

 const obtenerisntitucion = (request, response) => {
    connection.query('SELECT i.Ins_Id AS id ,i.Ins_Nombre AS Institucion FROM esc_institucion i;', 
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.get("/obtenerisntitucion",obtenerisntitucion);

const insertarFuncionario = (request, response) => {
    const {cedula, institucion, escolaridad,experiencia,fechaIngreso,foto,descripcion} = request.body;
    connection.query('CALL PRC_InsertarFuncionario(?, ?, ?, ?,?, ?, ?, @msjError); SELECT @msjError As error;', 
    [cedula, institucion, escolaridad,experiencia,fechaIngreso,foto,descripcion],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarFuncionario").post(insertarFuncionario);

module.exports = app;