const express = require("express");
const app = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const fs = require('fs');

//conexión con la base de datos
const { connection } = require("../config");


const Loggin = (request, response) => {
    const usuario = request.params.usuario;
    const clave = request.params.clave;

    connection.query('SELECT u.Usu_Usuario, u.Usu_Clave, f.Func_Id, u.Rol_Id ' +
        'FROM esc_funcionarios f, esc_usuarios u ' +
        'WHERE f.Usu_Id=u.Usu_Id AND u.Usu_Usuario=? AND u.Usu_Clave=?',
        [usuario, clave],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

app.get("/loggin/:usuario/:clave", Loggin);

const Obtener_Secciones = (request, response) => {
    //const Sec_Grado = request.params.Sec_Grado;
    //const Sec_Seccion = request.params.Sec_Seccion;

    connection.query('SELECT s.Sec_Grado AS grado, s.Sec_Seccion AS seccion ' +
        'FROM esc_funcionarios f, esc_seccion s ' +
        'WHERE f.Func_Id=s.Func_Id AND f.Func_Id=?',
        [request.params.Func_Id],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

//ruta

app.get("/Constancia/:Func_Id", Obtener_Secciones);

const obtenerFuncionario = (request, response) => {
    const { cedula } = request.body;

    connection.query('SELECT p.Per_Identificacion AS cedula, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, ' +
        'p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido, DATE_FORMAT(p.Per_FechaNacimiento, "%Y-%m-%d")  as fechaNaci, ' +
        'p.Per_EstadoCivil AS EstadoCivil, p.Per_Sexo AS Sexo, i.Pais_Nombre AS Pais, d.Dir_Direccion AS Direccion, ' +
        'v.Pro_Nombre AS Provincia, t.Can_Nombre AS Canton, o.Dis_Nombre AS Distrito, f.Func_Escolaridad AS Escolaridad, ' +
        'f.Func_AniosLaborados AS Experiencia,DATE_FORMAT(f.Fun_FechaIngreso, "%Y/%m/%d")  as fechaIngre, ' +
        'f.Fun_Descripcion AS Descripcion, n.Ins_Nombre AS Institucion ' +
        'FROM esc_personas p, esc_pais i, esc_direccion d, ' +
        'esc_provincia v, esc_canton t, esc_distrito o, ' +
        'esc_funcionarios f, esc_institucion n ' +
        'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id =d.Per_id AND ' +
        'd.Pro_Id = v.Pro_Id AND d.Can_Id = t.Can_Id AND ' +
        'd.Dis_Id = o.Dis_Id AND p.Per_Id = f.Per_Id AND f.Ins_Id = n.Ins_Id ' +
        'AND f.Fun_Estado = ? AND p.Per_Identificacion = ?;',
        [request.params.estado, request.params.cedula],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

//ruta
app.get("/obtenerFuncionario/:estado/:cedula", obtenerFuncionario);


const MostrarFuncionario = (request, response) => {
    connection.query('SELECT p.Per_Identificacion AS cedula,CONCAT(p.Per_PNombre," ", p.Per_SNombre," ", p.Per_PApellido," ", p.Per_SApellido) As Nombre, ' +
        'GROUP_CONCAT(DISTINCT m.Mat_Nombre) AS MNombre, GROUP_CONCAT(DISTINCT c.Cont_Contacto) AS Contacto,' +
        'f.Fun_Descripcion AS Descripcion From esc_funcionarios f, esc_personas p, esc_materias m,esc_contactoper c, esc_materias_has_funcionarios mf ' +
        'WHERE p.Per_Id = f.Per_Id AND p.Per_Id = c.Per_Id AND f.Func_Id = mf.Func_Id AND mf.Mat_Id = m.Mat_Id AND f.Fun_Estado= "A" ' +
        'GROUP BY p.Per_Id;',
        (error, results) => {
            if (error)
                throw error;
            //console.log("Imagen " , results)
            response.status(201).json(results);
        });
}

app.get("/MostrarFuncionario", MostrarFuncionario);


const eliminarFuncionario = (request, response) => {
    const { cedula } = request.body;
    console.log("ELIMINAR ", request.body)
    connection.query('UPDATE esc_funcionarios AS F INNER JOIN esc_personas AS o ON F.Per_Id = o.Per_Id SET F.Fun_Estado= "I" ' +
        'WHERE o.Per_Identificacion= ? ;',
        [request.body.cedula],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

//ruta
app.route("/eliminarFuncionario").post(eliminarFuncionario);


const obtenerisntitucion = (request, response) => {
    connection.query('SELECT i.Ins_Id AS id ,i.Ins_Nombre AS Institucion FROM esc_institucion i;',
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};
app.get("/obtenerisntitucion", obtenerisntitucion);

const insertarFuncionario = (request, response) => {
    const { cedula, institucion, escolaridad, experiencia, fechaIngreso, descripcion } = request.body;
    connection.query('CALL PRC_InsertarFuncionario(?, ?, ?, ?,?,?, @msjError); SELECT @msjError As error;',
        [cedula, institucion, escolaridad, experiencia, fechaIngreso, descripcion],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

//ruta
app.route("/insertarFuncionario").post(insertarFuncionario);

const Obtener_estudiante = (request, response) => {

    connection.query('SELECT p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido, s.Sec_Grado AS Grado, s.Sec_Seccion AS Seccion ' +
        'FROM esc_personas p, esc_seccion s, esc_estudiantes e ' +
        'WHERE e.Per_Id=p.Per_Id AND e.Sec_Id=s.Sec_Id AND p.Per_Identificacion=?',
        [request.params.Per_Identificacion],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};


app.get("/Constancia/BusquedaId/:Per_Identificacion", Obtener_estudiante);

const Obtener_Funcionario_Rol = (request, response) => {

    connection.query('SELECT p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido ' +
        'FROM esc_personas p, esc_usuarios u, esc_funcionarios f, esc_roles r ' +
        'WHERE f.Per_Id=p.Per_Id AND f.Usu_Id=u.Usu_Id AND u.Rol_Id = r.Rol_Id AND r.Rol_Nombre=?',
        [request.params.Rol_Nombre],
        (error, results) => {
            if (error)
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


    connection.query('SELECT SUM(IF(a.TAsi_Id=1,1,0)) AS Asistencia , SUM(IF(a.TAsi_Id=2,1,0)) AS Ausencia, SUM(IF(a.TAsi_Id=3,1,0)) AS Ausencia_Justificada, p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido ' +
        'FROM esc_asistencia a, esc_tipoasistencia t, esc_estudiantes e, esc_personas p, esc_seccion s, esc_materias m ' +
        'WHERE a.Asi_FechaActual BETWEEN ? AND ? AND t.TAsi_Id = a.TAsi_Id AND a.Est_Id = e.Est_Id AND e.Sec_Id = s.Sec_Id AND e.Per_Id = p.Per_Id AND a.Mat_Id= m.Mat_Id AND s.Sec_Grado=? AND s.Sec_Seccion=? AND m.Mat_Nombre=? GROUP BY  p.Per_PNombre ',
        [FechaIni, FechaFin, Grado, Seccion, Materia],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};


app.get("/Reporte/:FechaIni/:FechaFin/:Grado/:Seccion/:Materia", Obtener_Ausencias);

const Obtener_Asistencia_Individual = (request, response) => {
    const FechaIni = request.params.FechaIni;
    const FechaFin = request.params.FechaFin;
    const Grado = request.params.Grado;
    const Seccion = request.params.Seccion;
    const Materia = request.params.Materia;
    const Identificacion = request.params.Identificacion;

    connection.query('SELECT SUM(IF(a.TAsi_Id=1,1,0)) AS Asistencia , SUM(IF(a.TAsi_Id=2,1,0)) AS Ausencia, SUM(IF(a.TAsi_Id=3,1,0)) AS Ausencia_Justificada, p.Per_Identificacion AS Identificacion, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido ' +
        'FROM esc_asistencia a, esc_tipoasistencia t, esc_estudiantes e, esc_personas p, esc_seccion s, esc_materias m ' +
        'WHERE a.Asi_FechaActual BETWEEN ? AND ? AND t.TAsi_Id = a.TAsi_Id AND a.Est_Id = e.Est_Id AND e.Sec_Id = s.Sec_Id AND e.Per_Id = p.Per_Id AND a.Mat_Id= m.Mat_Id AND p.Per_Identificacion=? AND s.Sec_Grado=? AND s.Sec_Seccion=? AND m.Mat_Nombre=? GROUP BY  p.Per_PNombre ',
        [FechaIni, FechaFin, Identificacion, Grado, Seccion, Materia],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

app.get("/ReporteIndividual/:FechaIni/:FechaFin/:Identificacion/:Grado/:Seccion/:Materia", Obtener_Asistencia_Individual);

const Obtener_Materias = (request, response) => {

    connection.query('SELECT m.Mat_Nombre AS materia ' +
        'FROM esc_funcionarios f,  esc_materias m ' +
        'WHERE f.Func_Id=m.Func_Id AND m.Func_Id=?',
        [request.params.Func_Id],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

const ListarMateria = (request, response) => {

    connection.query('SELECT m.Mat_Nombre AS Materia,m.Mat_Id As Id FROM esc_materias m',
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

app.get("/ListarMateria", ListarMateria);

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

const obtenerAsistencia = (request, response) => {
    connection.query(
        "SELECT e.Est_Id AS estId,p.Per_Identificacion AS cedula,p.Per_PNombre AS pnombre,p.Per_SNombre AS snombre,p.Per_PApellido AS papellido,p.Per_SApellido AS sapellido, a.Asi_Justificacion AS justificacion, a.TAsi_Id AS tasistencia " +
        "FROM esc_estudiantes e, esc_seccion s, esc_personas p, esc_asistencia a " +
        "WHERE s.Sec_Id=e.Sec_Id AND e.Per_Id=p.Per_Id AND s.Sec_Grado=? AND s.Sec_Seccion=? AND e.Est_Id=a.Est_Id AND a.Asi_FechaActual=?",
        [request.params.Sec_Grado, request.params.Sec_Seccion, request.params.Asi_FechaActual],
        (error, results) => {
            if (error) throw error;
            response.status(201).json(results);
        }
    );
};

//ruta
app.get("/obtenerAlumnos/:Sec_Grado/:Sec_Seccion/:Asi_FechaActual", obtenerAsistencia);

const Asistencia_Comedor = (request, response) => {
    const FechaIni = request.params.FechaIni;
    const FechaFin = request.params.FechaFin;

    connection.query('SELECT DISTINCT COUNT(a.Est_Id) AS Cant_Est, DATE_FORMAT(a.AsiCom_FechaActual, "%Y-%m-%d") AS Fecha ' +
        'FROM esc_estudiantes e, esc_asistenciacomedor a ' +
        'WHERE a.AsiCom_FechaActual BETWEEN ? AND ? AND a.Est_Id=e.Est_Id GROUP BY a.AsiCom_FechaActual ',
        [FechaIni, FechaFin],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

app.get("/Asistencia_Comedor/:FechaIni/:FechaFin", Asistencia_Comedor);

const insertarAsistencia = (request, response) => {
    const { estid, fechaA, justificacion, materia, tipoAsistencia } = request.body;
    connection.query('CALL `PRC_InsertarAsistencia`(?, ?, ?, ?, ?, @msjError); SELECT @msjError As error;',
        [estid, fechaA, justificacion, materia, tipoAsistencia],
        (error, results) => {
            if (error)
                throw error;
            response.status(201).json(results);
        });
};

//ruta
app.route("/insertarAsistencia").post(insertarAsistencia);



//Funcion de recibir y guardar los horarios en PDF
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "horarios/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const horarios = multer({ storage: storage });
app.post('/horarios', horarios.array('pdfFiles', 10), function (req, res, next) {
    const pdfFiles = req.files;
    pdfFiles.forEach(function (file) {
        console.log(file.filename);
    });
    res.send('Archivos subidos correctamente');
});

//Funcion para devolver los horarios en PDF
app.get('/horario', (req, res) => {
    const pdfDir = path.join(__dirname, '../horarios');
    fs.readdir(pdfDir, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la lista de archivos PDF');
        } else {
            const pdfs = files.filter(file => file.endsWith('.pdf'));
            console.log("Esto lleva", pdfs)
            res.json(pdfs.map(pdf => ({ filename: pdf })));
        }
    });
});

app.get('/horarios/:filename', (req, res) => {
    const filename = req.params.filename;
    console.log("direccion ", filename)
    const filepath = path.join(__dirname, '../horarios', filename);
    res.download(filepath, filename);
});




const { request } = require("http");
const { response } = require("./personaService");

const storageFoto = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'services/uploads/')
    },
    filename: function (req, file, cb) {
        const arr = file.originalname.split('.');
        const date = new Date(Date.now());
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        console.log("ARR[0] ", arr[0])
        const arr2 = arr[0].split('-');
        console.log("ARR2[0] ", arr[0])
        //const nuevoNombre= arr[0]+'-('+formattedDate+').'+arr[1];
        const nuevoNombre = arr2[0] + '.jpg';
        cb(null, nuevoNombre);
    }
});

const upload = multer({ storage: storageFoto });

app.post('/upload', upload.single('image'), function (req, res) {
    console.log("CUERPO", req.file);
    if (req.file) {
        const filePath = req.file.path;
        const array = req.file.path.split('\\');
        const newfilePath = array[1] + '/' + array[2];
        console.log("New NAME ", newfilePath)
        const cedula = req.body.cedula;
        console.log("IMAGEN ", req.file)
        connection.query('UPDATE esc_funcionarios AS F ' +
            'INNER JOIN esc_personas AS o ON F.Per_Id = o.Per_Id ' +
            'SET F.Fun_Foto= ? ' +
            'WHERE o.Per_Identificacion= ?;',
            [newfilePath, cedula],
            (error, results) => {
                if (error)
                    throw error;
                // res.status(201).json(results);
            });
        res.json({ message: 'Image subida con exito' });
    } else {
        res.status(400).json({ message: 'Error subiendo la imagen' });
    }
});


const ImagenFuncionario = async (request, response) => {
    const cedula = request.params.idcliente;
    console.log("Cliente ", request.params);
    //console.log("CEDULA ",cedula);
    await connection.query('SELECT f.Fun_Foto From esc_funcionarios f, esc_personas p WHERE f.Per_Id=p.Per_Id AND p.Per_Identificacion=?; ',
        [cedula],
        (error, results) => {
            if (error)
                throw error;
            // console.log("Respuesta ")
            const filePath = path.join(__dirname, results[0].Fun_Foto);
            // console.log("FOTO "  ,filePath); hkjh
            response.sendFile(filePath);
        });
};

app.get("/ImagenFuncionario/:idcliente", ImagenFuncionario);

module.exports = app;