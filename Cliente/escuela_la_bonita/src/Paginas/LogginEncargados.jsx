import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useState } from "react";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
//import { Button } from 'primereact/button';
//import { AppContext } from '../AppContext/providerOrganizacion';
import logIn from "../Recursos/Escudo_escuela.png";
import "../Estilos.css";
import Logo from "../Recursos/Icon.png";
import { Header } from "../Componentes/Cabecera";
import Cookies from "universal-cookie";
import { Card, Form, Button } from "react-bootstrap";

export function LogginEncargados() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const navegar = useNavigate();

  const InicioSesion = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/logginEnc/${value1}/${value2}`
      );
          if (response.data.error) {

             Swal.fire('Error', 'Usuario o contraseña incorrectas');
             
          } else {
           const cookies = new Cookies();
           navegar("/InicioEnc");
         }
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <div>
      {" "}
      <Header />
      <div>
      <div className="container mt-5">
        <Card
          className="mx-auto"
          style={{
            maxWidth: "600px",
            backgroundImage:
              "linear-gradient(145deg, rgb(195, 240, 200), rgb(80, 155, 245))",
          }}
        >
        <div className="header">
          <Card.Img
            variant="top"
            src={Logo}
            style={{ width: "200px", margin: "0 auto" }}
          />
          </div>
          <Card.Body>
            <Card.Title
              className="text-center mb-4"
              style={{ color: "#ffffff", fontSize: "24px", fontWeight: "bold" }}
            >
              Inicio de sesión de los encargados
            </Card.Title>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Control
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Ingrese su nombre de usuario"
                  required
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  style={{ borderRadius: "30px" }}
                />
              </Form.Group>
              <br></br>
              <Form.Group controlId="formPassword">
                <Form.Control
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  required
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  style={{ borderRadius: "30px" }}
                />
              </Form.Group>
              <Button
                className="mt-4 mx-auto d-block w-100"
                style={{ borderRadius: "30px" }}
                onClick={() => InicioSesion()}
              >
                Iniciar Sesión
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted text-center bg-light">
            <div>
              <a href="/CrearUsu" className="mr-2">
                Registrarse
              </a>
              <span>|</span>
              <a href="/RecuperarContrasena" className="ml-2">
                Recuperar Contraseña
              </a>
            </div>
          </Card.Footer>
        </Card>
      </div>
      <br></br>
      </div>
    </div>
  );
}
