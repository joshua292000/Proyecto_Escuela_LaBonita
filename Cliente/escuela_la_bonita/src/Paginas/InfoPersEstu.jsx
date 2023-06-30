
import { InfoPersonal } from "../Componentes/InfoPersEstu";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
    return (
      <div>
      {" "}
      <Header />
      <div className="Div">
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Información Personal del Estudiante</span>
        <div style={{backgroundColor:'white' ,borderRadius: '15px',paddingTop:'15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
          <InfoPersonal/>
          {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
        </div>
        
        </div> 
      </div> 
    );
  }
