import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { Header } from "../Componentes/Cabecera";
import Logo from "../Recursos/Icon.png";
import "../Estilos.css";


 export function LogginEncargados() {
  const navegar = useNavigate();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const InicioSesion = async () => {
    try {
      await axios
        .get("http://localhost:3000/logginEnc/" + value1 + "/" + value2)
        .then((res) => {
          console.log("tiene loggin",res.data);
          //const cookies = new Cookies();
          //cookies.set('Func_Id', res.data[0].Func_Id, {path: '/'});
          //cookies.set('Rol_Id', res.data[0].Rol_Id, {path: '/'});
          if (res.data.length >0) {
            //Swal.fire('Excelente', 'Usuario correcto'); 
            navegar("/InicioEnc");
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
          <span className="title">Inicio de sesión </span><br/>
          <span className="title">Encargados</span>
            <ul>
              <li>
                <a href="#">Iniciar sesión</a>
              </li>
              <li>
                <a href="/CrearUsu">Crear una cuenta</a>
              </li>
            </ul>
          </nav>
          <form>
            <div className="row">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Numero de Cedula"
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
                type="submit"
                onClick={() => InicioSesion()}
              >
                Iniciar sesion
              </button>
            </div>
            <div className="forgot">
              <a href="#">¿Olvidó su contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    );
    

  }