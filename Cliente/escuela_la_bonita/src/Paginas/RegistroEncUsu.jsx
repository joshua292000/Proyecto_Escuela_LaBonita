import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { Header } from "../Componentes/Cabecera";
import "../EstilosJoshua.css";
import Logo from "../Recursos/Icon.png";
import "../EstilosJoshua.css";


 export function RegistroUsuEnc() {
  const navegar = useNavigate();
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
                <a href="#">Crear una cuenta</a>
              </li>
            </ul>
          </nav>
          <form>
            <div className="row">
              <input
                className="input"
                type="text"
                name="username"
                placeholder="Usuario"
                required
              />
            </div>
            <div className="row">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
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
                onClick={() => navegar("/Informacionpersonal")}
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