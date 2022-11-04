import Inicio from "./Paginas/Inicio";   
import Informacionpers from "./Paginas/Informacionpers";  
import {InfoEstudiante} from "./Paginas/InformacionEst";  
import InformacionEnc from "./Paginas/InformacionEnc";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { RegistroUsuEnc } from "./Paginas/RegistroEncUsu";
import {Loggin} from "./Paginas/Loggin";
import PaginaInicial from "./Paginas/PaginaInicial";

export function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/Loggin" element={<Loggin />} />
      <Route path="/Informacionpersonal" element={<Informacionpers />} />
      <Route path="/Informacionestudiante" element={<InfoEstudiante />} />
      <Route path="/Informacionencargado" element={<InformacionEnc />} />
      <Route path="/RegistroEncargados" element={<RegistroUsuEnc />} />
    </Routes>
  </BrowserRouter>
);
}