const express = require("express");
const app = express.Router();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config");

const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

//Actualiza el usuario
const ActualizarUsuarioEnc = (request, response) => {
  const{Identificacion, Clave} = request.body;
  connection.query('CALL PRC_ActualizarUsuarioEncargado(?, ?, @msjError); SELECT @msjError AS error;', 
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
app.route("/ActualizarUsuarioEnc").put(ActualizarUsuarioEnc);


  //--------------------Recuperacion de contraseña----------------------------

  const generarTokenRecuperacionContrasena = () => {
    // Generar un buffer aleatorio de 32 bytes
    const buffer = crypto.randomBytes(6);
    
    // Convertir el buffer a una cadena hexadecimal
    const token = buffer.toString("hex");
  
    return token;
  };


  // Configurar el transporte de nodemailer con los detalles del servicio de correo
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mgranadosnloria@gmail.com", // Correo electrónico desde el cual se enviarán los correos
      pass: "ilrzcmfihvedbbbp", // Contraseña del correo electrónico
    },
  });

  const sendPasswordRecoveryEmail = (nombre, to, token) => {
    // Cuerpo del correo
    const mailOptions = {
      from: "mgranadosnloria@gmail.com", // Correo electrónico del remitente
      to: to, // Correo electrónico del destinatario
      subject: "Recuperación de contraseña de su cuenta en la Escuela Rodrigo Facio Brenes ", // Asunto del correo
      html: `
        <h1>Recuperación de Contraseña</h1>
        <p>Estimado/a ${nombre}, </p>

        <p> Recibimos una solicitud para restablecer la contraseña de tu cuenta en la Escuela Rodrigo Facio Brenes. Para completar el proceso de recuperación de contraseña, por favor sigue los pasos a continuación: </p>
        
        <p> Digite el siguiente codigo ${token} en el campo de codigo de seguridad de la pagina de recuperación de contraseña </p>
        <p> Sigue las instrucciones en la página de recuperación de contraseña para crear una nueva contraseña segura para tu cuenta. </p>
        <p> Una vez que hayas creado una nueva contraseña, podrás acceder nuevamente a tu cuenta en la página Escuela Rodrigo Facio Brenes con tus credenciales actualizadas. </p>
        <p> Por favor, ten en cuenta que este enlace es de un solo uso y expirará en 10 minutos por motivos de seguridad. </p>
        
        <p> Si no solicitaste la recuperación de contraseña, por favor ignora este correo y toma las medidas necesarias para asegurar la seguridad de tu cuenta. </p>
        
        <p> Si tienes alguna pregunta o necesitas ayuda adicional, por favor no dudes en ponerte en contacto con nuestro equipo de soporte al correo esc.rodrigofaciobrenes@mep.go.cr. </p>
        
        <p> Gracias por tu atención a este asunto y por utilizar la página Escuela Rodrigo Facio Brenes. </p>
        
        <p> Atentamente,</p>
        <p> Escuela Rodrigo Facio Brenes </p>
        
      `, // Contenido HTML del correo
    };
  
    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo de recuperación de contraseña:", error);
      } else {
        console.log("Correo de recuperación de contraseña enviado:", info.response);
      }
    });
  };
 


  const ObtenerCorreo = (request, response) => {

    const correo = request.params.correo;

    connection.query('SELECT c.Cont_Contacto AS Contacto, p.Per_PNombre AS PNombre, p.Per_SNombre AS SNombre, p.Per_PApellido AS PApellido, p.Per_SApellido AS SApellido '+
                    'FROM esc_contactoper c, esc_personas p '+
                    'WHERE c.Tco_Id = "2" AND c.Cont_Contacto =? AND c.Per_Id = p.Per_Id',
    [correo],
    (error, results) => {
        if(error)
            throw error;
        //response.status(201).json(results);
        //console.log("igual entra",results);
        if(results.length>0){
            console.log("igual entra",results);
            const Nombre = results[0].PNombre +' '+ results[0].SNombre +' '+ results[0].PApellido +' '+ results[0].SApellido;
            const email = results[0].Contacto;
            const token = generarTokenRecuperacionContrasena();
            sendPasswordRecoveryEmail(Nombre, email, token);
            response.status(201).json(token); 
        }else{
            response.status(201).json(results);
        }
    });
};

app.get("/ObtenerCorreo/:correo",ObtenerCorreo);
  

module.exports = app;

