import Inicio from "./Paginas/Inicio";   
import Informacionpers from "./Paginas/Informacionpers";  
import InformacionEst from "./Paginas/InformacionEst";  
import InformacionEnc from "./Paginas/InformacionEnc";  
import { BrowserRouter, Route, Routes } from "react-router-dom";


export function App() {
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/Informacionpersonal" element={<Informacionpers/>}/>
        <Route path="/Informacionestudiante" element={<InformacionEst/>}/>
        <Route path="/Informacionencargado" element={<InformacionEnc/>}/>
    </Routes>
    </BrowserRouter>
    
    );
}