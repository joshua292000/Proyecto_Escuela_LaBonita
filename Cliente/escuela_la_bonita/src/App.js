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
import 'primeflex/primeflex.css';
import { LogginEncargados } from "./Paginas/LogginEncargados";
import {Loggin} from "./Paginas/Loggin";
import PaginaInicial from "./Paginas/PaginaInicial";
import {Constancias} from "./Paginas/Constancia";
import { Asistencia } from "./Paginas/Asistencia";
import { Reporte } from "./Paginas/Reporte";
import { ReporteComedor } from "./Paginas/ReporteComedor";
import { AcercaDe } from "./Paginas/AcercaDe";
import { Proyectos } from "./Paginas/Proyectos";
import { ActividadesDiarias } from "./Paginas/ActividadesDiarias";
import { SubirPDF } from "./Paginas/SubirPDF";
import { Horarios } from "./Paginas/Horarios";
import { CrearUsu} from "./Paginas/CrearUsu";
import { RecuperarContrasena } from "./Paginas/RecuperarContrasena";
import InicioEnc from "./Paginas/InicioEnc";
import DataViewDemo from "./Paginas/InfoProfesores";
export function App() {
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaginaInicial />} />
      <Route path="/Loggin" element={<Loggin />} />
      <Route path="/Inicio" element={<Inicio />} />
      <Route path="/Informacionpersonal" element={<InfoPersEstu />} />
      <Route path="/Informacionestudiante" element={<InfoEstudiante />} />
      <Route path="/Informacionencargado" element={<InformacionEnc />} />
      <Route path="/LogginEncargados" element={<LogginEncargados />} />
      <Route path="/Constancias" element={<Constancias />} />
      <Route path="/Reporte" element={<Reporte />} />
      <Route path="/ReporteComedor" element={<ReporteComedor />} />
      <Route path="/AsistenciaEstudiantes" element={<Asistencia />} />
      <Route path="/RegistroProfesor" element={<InformacionPro />} />
      <Route path="/AcercaDe" element={<AcercaDe />} />
      <Route path="/Proyectos" element={<Proyectos />} />
      <Route path="/InicioEnc" element={<InicioEnc />} />
      <Route path="/ActividadesDiarias" element={<ActividadesDiarias />} />
      <Route path="/SubirPDF" element={<SubirPDF />} />
      <Route path="/Horarios" element={<Horarios />} />
      <Route path="/CrearUsu" element={<CrearUsu />} />
      <Route path="/RecuperarContrasena" element={<RecuperarContrasena />} />
      <Route path="/Profesores" element={<DataViewDemo />} />


    </Routes>
  </BrowserRouter>
);
}
