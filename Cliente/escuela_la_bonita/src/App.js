import Inicio from "./Paginas/Inicio";   
import Informacionpers from "./Paginas/Informacionpers";  
import { BrowserRouter, Route, Routes } from "react-router-dom";


export function App() {
return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/Informacionpersonal" element={<Informacionpers/>}/>
    </Routes>
    </BrowserRouter>
    
    );
}