const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

//Inserta en la tabla esc_Encargados
const InsertarEncargado = (request, response) => {
    const {cedula, lugarTrabajo, viveConEstu, parentesco, ocupacion, escolaridad} = request.body;
    connection.query('CALL PRC_InsertarEncargado(?, ?, ?, ?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedula, lugarTrabajo, viveConEstu, parentesco, ocupacion, escolaridad],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
    //console.log(request.body);
};

//ruta
app.route("/insertarEncargado").post(InsertarEncargado);

//Inserta en la tabla esc_Estudiante_has_Encargados
const InsertarEncargadoEstudiante = (request, response) => {
    const {cedulaEncar, cedulaEst, estado} = request.body;
    connection.query('CALL PRC_InsertarEncargadoEstudiante(?, ?, ?, @msjError); SELECT @msjError AS error;', 
    [cedulaEncar, cedulaEst, estado],
    (error, results) => {
        if(error){
            //se retorna el error así para realizar la validacion de errores generica en el cliente
            response.status(500).json([{error: "Se produjo un error al insertar"}]);
        }else{
            //se retorna la posicion 1 ya que ahí se encuentra el valor de la variable de error
            response.status(200).json(results[1]);
        }
    });
    //console.log(cedulaEncar, cedulaEst, estado);
};

//ruta
app.route("/insertarEncargadoEst").post(InsertarEncargadoEstudiante);




const ObtenerEncargado= (request, response) => {
    connection.query('CALL PRC_ObtenerEncargado( ?, @cedula, @pNombre, @sNombre, '+
                                                '@pApellido, @sApellido, @fechNaci, @estCivil, '+
                                                '@sexo, @nacionalidad, @direccion, @provincia, '+
                                                '@canton, @distrito, @lugarTrabajo, @viveCEstu, '+ 
                                                '@escolaridad, @ocupacion, @parentezco, @telefono, @correo, @msjError); ' +             
                                        'SELECT  @cedula  as cedula, @pNombre as pNombre, @sNombre as sNombre, '+
                                                '@pApellido as pApellido, @sApellido as sApellido, @fechNaci as fechaNaci, @estCivil as estadoCivil, '+
                                                '@sexo as sexo, @nacionalidad  as lugarNacimiento, @direccion as direccion, @provincia as provincia, '+
                                                '@canton  as canton, @distrito  as distrito, @lugarTrabajo as lugarTrabajo, @viveCEstu  as viveConEstu, '+ 
                                                '@escolaridad as escolaridad, @ocupacion as ocupacion, @parentezco as parentesco, @telefono as telefono, '+
                                                '@correo as correo, @msjError AS error;',                                                   
    [request.params.cd],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results[1]);
    });
};
app.get("/obtenerEncargado/:cd", ObtenerEncargado)

const ObtenerEncargadosXidEst= (request, response) => {
    connection.query('SELECT p.Per_Identificacion cedula, p.Per_PNombre pNombre, p.Per_SNombre sNombre, '+
                           'p.Per_PApellido pApellido, p.Per_SApellido sApellido, '+
                           'DATE_FORMAT(p.Per_FechaNacimiento, "%Y/%m/%d")  as fechaNaci, '+
                            'p.Per_EstadoCivil estadoCivil, p.Per_Sexo sexo, i.Pais_Nombre lugarNacimiento, '+
                            ' d.Dir_Direccion direccion, v.Pro_Nombre provincia, c.Can_Nombre canton, '+
                            's.Dis_Nombre distrito, g.Enc_LugarDeTrabajo lugarTrabajo, '+
                            'g.Enc_ViveConEstudiante viveConEstu, e.Esco_Nombre escolaridad, '+
                            ' o.Ocu_Nombre ocupacion, r.Par_Nombre parentesco, '+
                            'GROUP_CONCAT(t.Cont_Contacto SEPARATOR "-") contactos, ' + 
                            'h.Ehe_estado estado '+	
                    'FROM esc_personas p, esc_pais i, esc_direccion d, '+
                        'esc_provincia v, esc_canton c, esc_distrito s, '+
                        'esc_encargados g, esc_escolaridad e, esc_ocupacion o, '+
                        'esc_parentezco r, esc_estudiantes_has_encargados h, esc_contactoper t '+
                    'WHERE p.Esc_Nacionalidad = i.Pais_Id AND p.Per_Id = d.Per_id AND '+
                        'd.Pro_Id = v.Pro_Id AND d.Can_Id = c.Can_Id AND d.Dis_Id = s.Dis_Id AND '+
                        'p.Per_Id = g.Per_Id AND g.Esco_Id = e.Esco_Id AND g.Ocu_Id = o.Ocu_Id AND '+
                        'g.Par_Id = r.Par_Id AND g.Enc_Id =h.Enc_Id AND p.Per_Id = t.Per_Id '+
                        'AND h.Ehe_estado = "A" AND h.Est_Id = ? GROUP BY p.Per_Id; ',                                                   
    [request.params.id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.get("/ObtenerEncargadosXidEst/:id", ObtenerEncargadosXidEst);


 //Loggin de Encargados

 const LogginEnc = (request, response) => {
    const usuario = request.params.usuario;
    const clave = request.params.clave;

    connection.query('SELECT u.Usu_Usuario, u.Usu_Clave '+
                    'FROM esc_usuarios u '+
                    'WHERE u.Usu_Usuario=? AND u.Usu_Clave=?',
    [usuario, clave],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.get("/logginEnc/:usuario/:clave",LogginEnc);

//Crea el usuario de los encargados si el numero de cedula existe
const CrearUsuarioEnc = (request, response) => {
    const{Identificacion, Clave} = request.body;
    connection.query('CALL PRC_InsertarUsuarioEncargado(?, ?, @msjError); SELECT @msjError AS error;', 
      [Identificacion,Clave],
      (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).json(results);
      }
    );
  };
   
  //ruta
  app.route("/CrearUsuarioEnc").post(CrearUsuarioEnc);

module.exports = app;
