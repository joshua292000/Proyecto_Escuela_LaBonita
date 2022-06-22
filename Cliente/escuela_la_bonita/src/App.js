import Inicio from "./Paginas/Inicio";   
import Informacionpers from "./Paginas/Informacionpers";  
import {InfoEstudiante} from "./Paginas/InformacionEst";  
import InformacionEnc from "./Paginas/InformacionEnc";  
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';

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