import Inicio from "./Paginas/Inicio";   
import Informacionpers from "./Paginas/Informacionpers";  
import {InfoEstudiante} from "./Paginas/InformacionEst";  
import InformacionEnc from "./Paginas/InformacionEnc";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   

export function App() {
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/Informacionpersonal" element={<Informacionpers/>}/>
        <Route path="/Informacionestudiante" element={<InfoEstudiante/>}/>
        <Route path="/Informacionencargado" element={<InformacionEnc/>}/>
    </Routes>
    </BrowserRouter>
    
    );
}