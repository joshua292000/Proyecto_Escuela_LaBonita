const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Encargados
const InsertarEncargado = (request, response) => {
    const {cedulaPer, lugarTrabajo, viveConEst, parentesco, ocupacion, escolaridad} = request.body;
    connection.query('CALL PRC_InsertarEncargado(?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaPer, lugarTrabajo, viveConEst, parentesco, ocupacion, escolaridad],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarEncargado")
.post(InsertarEncargado);

//Inserta en la tabla esc_Estudiante_has_Encargados
const InsertarEncargadoEstudiante = (request, response) => {
    const {cedulaEncar, cedulaEst, estado} = request.body;
    connection.query('CALL PRC_InsertarEncargadoEstudiante(?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaEncar, cedulaEst, estado],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

//ruta
app.route("/insertarEncargadoEst")
.post(InsertarEncargadoEstudiante);




const ObtenerEncargado= (request, response) => {
    connection.query('CALL PRC_ObtenerEncargado( ?, ?, @cedula, @pNombre, @sNombre, '+
                                                '@pApellido, @sApellido, @fechNaci, @estCivil, '+
                                                '@sexo, @nacionalidad, @direccion, @provincia, '+
                                                '@canton, @distrito, @lugarTrabajo, @viveCEstu, '+ 
                                                '@escolaridad, @ocupacion, @parentezco, @telefono, @correo, @msjError); ' +             
                                        'SELECT  @cedula  as cedula, @pNombre as pNombre, @sNombre as sNombre, '+
                                                '@pApellido as pApellido, @sApellido as sApellido, @fechNaci as fechNaci, @estCivil as estCivil, '+
                                                '@sexo as sexo, @nacionalidad  as lugarnacimiento, @direccion as direccion, @provincia as provincia, '+
                                                '@canton  as canton, @distrito  as distrito, @lugarTrabajo as lugarTrabajo, @viveCEstu  as viveCEstu, '+ 
                                                '@escolaridad as escolaridad, @ocupacion as ocupacion, @parentezco as parentezco, @telefono as telefono, '+
                                                '@correo as correo, @msjError AS error;',                                                   
    [request.params.cd, request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results[1]);
    });
};
app.get("/obtenerEncargado/:cd/:id", ObtenerEncargado)

const ObtenerEncargadosXidEst= (request, response) => {
    connection.query('SELECT p.Per_Identificacion cedula, p.Per_PNombre pNombre, p.Per_SNombre sNombre, '+
                           'p.Per_PApellido pApellido, p.Per_SApellido sApellido, '+
                           'DATE_FORMAT(p.Per_FechaNacimiento, "%Y-%m-%d")  as fechaNaci, '+
                            'p.Per_EstadoCivil estadoCivil, p.Per_Sexo sexo, i.Pais_Nombre lugarNacimiento, '+
                            ' d.Dir_Direccion direccion, v.Pro_Nombre provincia, c.Can_Nombre canton, '+
                            's.Dis_Nombre distrito, g.Enc_LugarDeTrabajo lugarTrabajo, '+
                            'g.Enc_ViveConEstudiante viveConEstu, e.Esco_Nombre escolaridad, '+
                            ' o.Ocu_Nombre ocupacion, r.Par_Nombre parentesco, '+
                            'GROUP_CONCAT(t.Cont_Contacto SEPARATOR "-") contactos ' + 	   
                    'FROM esc_personas p, esc_pais i, esc_direccion d, '+
                        'esc_provincia v, esc_canton c, esc_distrito s, '+
                        'esc_encargados g, esc_escolaridad e, esc_ocupacion o, '+
                        'esc_parentezco r, esc_estudiantes_has_encargados h, esc_contactoper t '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id = d.Per_id AND '+
                        'd.Pro_Id = v.Pro_Id AND d.Can_Id = c.Can_Id AND d.Dis_Id = s.Dis_Id AND '+
                        'p.Per_Id = g.Per_Id AND g.Esco_Id = e.Esco_Id AND g.Ocu_Id = o.Ocu_Id AND '+
                        'g.Par_Id = r.Par_Id AND g.Enc_Id =h.Enc_Id AND p.Per_Id = t.Per_Id '+
                        'AND h.Ehe_estado = "A" AND h.Per_Id = ? GROUP BY p.Per_Id; ',                                                   
    [request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.get("/ObtenerEncargadosXidEst/:id", ObtenerEncargadosXidEst);




module.exports = app;
