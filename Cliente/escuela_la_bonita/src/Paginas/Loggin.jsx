import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState} from 'react';
import { useContext } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from 'primereact/button';
//import { AppContext } from '../AppContext/providerOrganizacion';
//import Cookies from "universal-cookie";
import logIn from '../Recursos/Escudo_escuela.png';
import "../Estilos.css"
import Logo from '../Recursos/Icon.png';
import { Header } from "../Componentes/Cabecera";

export function Loggin() {

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const navegar = useNavigate();

  const InicioSesion = async () => {
    try {
      await axios
        .get("http://localhost:3000/loggin/" + value1 + "/" + value2)
        .then((res) => {
          console.log(res.data);
         
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
  

