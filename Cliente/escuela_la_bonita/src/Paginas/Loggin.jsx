import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState} from 'react';
import { useContext } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
//import { AppContext } from '../AppContext/providerOrganizacion';
import logIn from '../Recursos/Escudo_escuela.png';
import "../Estilos.css"
import Logo from '../Recursos/Icon.png';
import { Header } from "../Componentes/Cabecera";
import Cookies from "universal-cookie";
import { Card, Form, Button } from "react-bootstrap";

export function Loggin() {

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const navegar = useNavigate();

  const InicioSesion = async () => {
    try {
      await axios
        .get("http://localhost:3000/loggin/" + value1 + "/" + value2)
        .then((res) => {
          console.log("tiene loggin",res.data);
          const cookies = new Cookies();
          cookies.set('Func_Id', res.data[0].Func_Id, {path: '/'});
          cookies.set('Rol_Id', res.data[0].Rol_Id, {path: '/'});
          if (res.data.length >0) {
            navegar("/Inicio");
          } else {
            Swal.fire('Error', 'Usuario o contraseña incorrectas');
          }
        });
    } catch (e) {
      console.log(e);
    }
  }; 
/*
    return (
      <div>
        {" "}
        <Header />
        <div id="RootLoggin">
          <div className="header">
            <img src={Logo} alt="Escuela Rodrigo Facio Brenes" width="200px" />
          </div>
          <nav className="menu">
            <span className="title">Inicio de sesión</span><br/>
            <span className="title">Funcionarios</span>
            <ul>
              <li>
                <a href="#">Iniciar sesion</a>
              </li>
              <li>
                <a href="#">Crear una cuenta</a>
              </li>
            </ul>
          </nav>
            <div className="row">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Usuario"
                required
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
            </div>
            <div className="row">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
              />
            </div>
            <div className="stay">
              <input type="checkbox" name="signed" id="signed" />{" "}
              <label htmlFor="signed">Mantener la sesión iniciada</label>
            </div>
            <div className="row">
              <button
                className="button"
                onClick={() => InicioSesion()}
              >
                Iniciar sesion
              </button>
            </div>
            <div className="forgot">
              <a href="#">¿Olvidó su contraseña?</a>
            </div>
        </div>
      </div>
    );
  }
  
*/

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
            Inicio de sesión de funcionarios
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

