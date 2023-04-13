
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { AsignarSecciones } from "../Componentes/AsignarSeccion";

export  function AsignarSeccion() {
    return (
      <div>
      {" "}
      <Header />
      <div className="Div">
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Asignación de secciones</span>
        <div style={{backgroundColor:'white' ,borderRadius: '15px',paddingTop:'15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
          <AsignarSecciones/>
        </div>
      </div> 
      </div> 
    );
  }
