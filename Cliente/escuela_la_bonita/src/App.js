import Inicio from "./Paginas/Inicio";   
import InfoPersEstu from "./Paginas/InfoPersEstu"; 
import {InfoEstudiante} from "./Paginas/InformacionEst";  
import InformacionEnc from "./Paginas/InformacionEnc";  
import InformacionPro from "./Paginas/InfoPersProf";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { RegistroUsuEnc } from "./Paginas/RegistroEncUsu";
import {Loggin} from "./Paginas/Loggin";
import PaginaInicial from "./Paginas/PaginaInicial";
import {Constancias} from "./Paginas/Constancia";

export function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/Loggin" element={<Loggin />} />
      <Route path="/Inicio" element={<Inicio/>}/>
      <Route path="/Informacionpersonal" element={<InfoPersEstu />} />
      <Route path="/Informacionestudiante" element={<InfoEstudiante />} />
      <Route path="/Informacionencargado" element={<InformacionEnc />} />
      <Route path="/RegistroEncargados" element={<RegistroUsuEnc />} />
      <Route path="/Constancias" element={<Constancias />} />
      <Route path="/RegistroProfesor" element={<InformacionPro />} />
    </Routes>
  </BrowserRouter>
);
}