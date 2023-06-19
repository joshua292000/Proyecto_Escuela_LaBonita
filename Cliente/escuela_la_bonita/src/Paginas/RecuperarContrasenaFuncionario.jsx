import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { Header } from "../Componentes/Cabecera";
import "../Estilos.css";
import { Card, Form, Button } from "react-bootstrap";


 export function RecuperarContrasenaFuncionario() {

  const navegar = useNavigate();

  const [email, setEmail] = useState('');
  const [codigoVerificacion, setCodigoVerificacion] = useState(null);

  const [mostrarCodigoVerificacion, setMostrarCodigoVerificacion] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const [mostrarCedula, setMostrarCedula] = useState(false);

  const [mostrarCorreo, setMostrarCorreo] = useState(true);

  const [valor1, setValor1] = useState('');
  const [Identificacion, setIdentificacion] = useState([]);
  const [Clave, setClave] = useState([]);

  const [clicked, setClicked] = useState(0); 


  const ConsultarCorreo = async () => {
    try {
      await axios
        .get("http://localhost:3000/ObtenerCorreo/" + email)
        .then((res) => {
          console.log("token: ", res.data)

          if (res.data.length >0) {
            //Swal.fire('Excelente', 'Usuario correcto'); 
            //navegar("/InicioEnc");
            Swal.fire('Excelente', 'Se ha enviado un correo de recuperación de contraseña a su dirección de correo electrónico.'); 
            
            setTimeout(() => {
              setCodigoVerificacion(res.data);
              
              setMostrarCodigoVerificacion(true);
              setMostrarNuevaContrasena(true);
              setMostrarCedula(true);

              setMostrarCorreo(false);

              setClicked(1);
              setTimeout(() => {
                setCodigoVerificacion(null)}
                , 600000); //10 minutos para que deje de servir el codigo de verificacion
           }, 2000);
              
          } else {
            Swal.fire('Error', 'Correo electronico incorrecto');
            
          }
        });
    } catch (e) {
      console.log(e);
    }
  }; 


  const CrearUsuarioEnc = async () => {
    try {
        await axios.put("http://localhost:3000/ActualizarUsuarioFunc", {Identificacion: Identificacion,
    Clave: Clave}).then((res)=>{
            res.data[1].map((dep) => {
                console.log("res trae "+dep.error)
                if (dep.error != null) {
                    Swal.fire('Error', 'La cedula digitada no es correcta');  
              }else{
                Swal.fire('Excelente', 'Se ha restablecido su contraseña');
                setClicked(0);
                navegar("/Loggin");
              }
           
         });
        });
        
    }catch(e){
        console.log(e);
        }
};
  
  

  const VerificarCodigo = () => {
    if (codigoVerificacion === valor1) {
      CrearUsuarioEnc();
      //setClicked(0);
    } else {
      Swal.fire('Error', 'El codigo de verificación es incorrecto');  
    }
  };

  const handleClick = () => {
    if (clicked===0) {
      ConsultarCorreo()
    } else {
      VerificarCodigo();
    }

  };
 
return (
      
  <div>
    {" "}
    <Header />
    <div className="container mt-5">
      <Card className="mx-auto" style={{ maxWidth: '350px'}}>
        <Card.Body>
          <Card.Title className="text-center" style={{ color: "blue", fontWeight: "bold", fontSize: "24px" }}>
            Recuperación de Contraseña
          </Card.Title>
          <Form>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              style={{ borderRadius: "25px",display: mostrarCorreo ? "block" : "none"  }}
              required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="codigoverificacion">
            <Form.Control
              type="text"
              placeholder="Ingrese su Código de verificación"
              style={{ borderRadius: "25px",display: mostrarCodigoVerificacion ? "block" : "none"  }}
              required
                value={valor1}
                onChange={(e) => setValor1(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="cedula">
            <Form.Control
              type="text"
              placeholder="Ingrese su número de cedula"
              style={{ borderRadius: "25px",display: mostrarCedula ? "block" : "none"  }}
              required
                value={Identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="nuevaContrasena">
            <Form.Control
              type="password"
              placeholder="Ingrese su nueva contraseña"
              style={{ borderRadius: "25px", display: mostrarNuevaContrasena ? "block" : "none"  }}
              required
                value={Clave}
                onChange={(e) => setClave(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Button className="mt-4 mx-auto d-block w-100"  onClick={() => handleClick()}>
          {clicked ? 'Crear nueva contraseña' : 'Enviar correo de recuperación'}
          </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          ¿Necesitas una cuenta? Regístrate <a href="/CrearUsuFuncionario">aquí</a>
        </Card.Footer> 
      </Card>
    </div>
    </div>
    );

  }