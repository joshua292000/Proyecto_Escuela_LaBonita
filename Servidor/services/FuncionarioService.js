const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");


const Loggin = (request, response) => {
    const usuario = request.params.usuario;
    const clave = request.params.clave;

    connection.query('SELECT u.Usu_Usuario, u.Usu_Clave, f.Func_Id, u.Rol_Id '+
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

const Obtener_estudiante = (request, response) => {
 
    connection.query('SELECT p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido, s.Sec_Grado AS Grado, s.Sec_Seccion AS Seccion '+
                    'FROM esc_personas p, esc_seccion s, esc_estudiantes e '+
                    'WHERE e.Per_Id=p.Per_Id AND e.Sec_Id=s.Sec_Id AND p.Per_Identificacion=?',
    [request.params.Per_Identificacion],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};


app.get("/Constancia/BusquedaId/:Per_Identificacion", Obtener_estudiante);

const Obtener_Funcionario_Rol = (request, response) => {
 
    connection.query('SELECT p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido '+
                    'FROM esc_personas p, esc_usuarios u, esc_funcionarios f, esc_roles r '+
                    'WHERE f.Per_Id=p.Per_Id AND f.Usu_Id=u.Usu_Id AND u.Rol_Id = r.Rol_Id AND r.Rol_Nombre=?',
    [request.params.Rol_Nombre],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};


app.get("/Constancia/BusquedaRol/:Rol_Nombre", Obtener_Funcionario_Rol);

const Obtener_Ausencias = (request, response) => {
    const FechaIni = request.params.FechaIni;
    const FechaFin = request.params.FechaFin;
    const Grado = request.params.Grado;
    const Seccion = request.params.Seccion;
    const Materia = request.params.Materia;
 

    connection.query('SELECT SUM(IF(a.TAsi_Id=1,1,0)) AS Asistencia , SUM(IF(a.TAsi_Id=2,1,0)) AS Ausencia, SUM(IF(a.TAsi_Id=3,1,0)) AS Ausencia_Justificada, p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido '+
                    'FROM esc_asistencia a, esc_tipoasistencia t, esc_estudiantes e, esc_personas p, esc_seccion s, esc_materias m '+
                    'WHERE a.Asi_FechaActual BETWEEN ? AND ? AND t.TAsi_Id = a.TAsi_Id AND a.Est_Id = e.Est_Id AND e.Sec_Id = s.Sec_Id AND e.Per_Id = p.Per_Id AND a.Mat_Id= m.Mat_Id AND s.Sec_Grado=? AND s.Sec_Seccion=? AND m.Mat_Nombre=? GROUP BY  p.Per_PNombre ',
    [FechaIni, FechaFin, Grado, Seccion, Materia],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};


app.get("/Reporte/:FechaIni/:FechaFin/:Grado/:Seccion/:Materia",Obtener_Ausencias);

const Obtener_Asistencia_Individual = (request, response) => {
    const FechaIni = request.params.FechaIni;
    const FechaFin = request.params.FechaFin;
    const Grado = request.params.Grado;
    const Seccion = request.params.Seccion;
    const Materia = request.params.Materia;
    const Identificacion = request.params.Identificacion;

    connection.query('SELECT SUM(IF(a.TAsi_Id=1,1,0)) AS Asistencia , SUM(IF(a.TAsi_Id=2,1,0)) AS Ausencia, SUM(IF(a.TAsi_Id=3,1,0)) AS Ausencia_Justificada, p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido '+
                    'FROM esc_asistencia a, esc_tipoasistencia t, esc_estudiantes e, esc_personas p, esc_seccion s, esc_materias m '+
                    'WHERE a.Asi_FechaActual BETWEEN ? AND ? AND t.TAsi_Id = a.TAsi_Id AND a.Est_Id = e.Est_Id AND e.Sec_Id = s.Sec_Id AND e.Per_Id = p.Per_Id AND a.Mat_Id= m.Mat_Id AND p.Per_Identificacion=? AND s.Sec_Grado=? AND s.Sec_Seccion=? AND m.Mat_Nombre=? GROUP BY  p.Per_PNombre ',
    [FechaIni, FechaFin,Identificacion, Grado, Seccion, Materia],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/ReporteIndividual/:FechaIni/:FechaFin/:Identificacion/:Grado/:Seccion/:Materia",Obtener_Asistencia_Individual);

const Obtener_Materias = (request, response) => {
 
    connection.query('SELECT m.Mat_Nombre AS materia '+
                    'FROM esc_funcionarios f,  esc_materias m '+
                    'WHERE f.Func_Id=m.Func_Id AND m.Func_Id=?',
    [request.params.Func_Id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/ObtenerMaterias/:Func_Id", Obtener_Materias);

const obtenerAlumnos = (request, response) => {
  connection.query(
    "SELECT e.Est_Id AS estId,p.Per_Identificacion AS cedula,p.Per_PNombre AS pnombre,p.Per_SNombre AS snombre,p.Per_PApellido AS papellido,p.Per_SApellido AS sapellido " +
      "FROM esc_estudiantes e, esc_seccion s, esc_personas p " +
      "WHERE s.Sec_Id=e.Sec_Id AND e.Per_Id=p.Per_Id AND s.Sec_Grado=?  AND s.Sec_Seccion=?",
    [request.params.Sec_Grado, request.params.Sec_Seccion],
    (error, results) => {
      if (error) throw error;
      response.status(201).json(results);
    }
  );
};

//ruta
app.get("/obtenerAlumnos/:Sec_Grado/:Sec_Seccion", obtenerAlumnos);


const Asistencia_Comedor = (request, response) => {
    const FechaIni = request.params.FechaIni;
    const FechaFin = request.params.FechaFin;
 
    connection.query('SELECT DISTINCT COUNT(a.Est_Id) AS Cant_Est, DATE_FORMAT(a.AsiCom_FechaActual, "%Y-%m-%d") AS Fecha '+
                    'FROM esc_estudiantes e, esc_asistenciacomedor a '+
                    'WHERE a.AsiCom_FechaActual BETWEEN ? AND ? AND a.Est_Id=e.Est_Id GROUP BY a.AsiCom_FechaActual ',
    [FechaIni, FechaFin],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/Asistencia_Comedor/:FechaIni/:FechaFin", Asistencia_Comedor);


module.exports = app;