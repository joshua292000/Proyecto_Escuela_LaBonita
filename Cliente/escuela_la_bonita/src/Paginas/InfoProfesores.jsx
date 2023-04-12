import { ButtonSiguiente } from "../Componentes/Utils";
import { useContext } from "react";
import { DataViewDemo } from "../Componentes/ProfesoresCom";
import { TabView, TabPanel } from 'primereact/tabview';

import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
  return (
    <div>
    {" "}
    <Header />
    <div id="r" className="Div" >
      <span className="titleBlack" style={{marginBottom:'2%'}}>Información personal del profesor</span>
        <DataViewDemo></DataViewDemo>

      {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      
    </div>
    </div>
  );
}