import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { AsigSeccionProfes } from "../Componentes/AsignarSecProfe";

export  function AsignarSeccionProfe() {
    return (
      <div>
        <Header />
        <div className="Div">
          <span className="titleBlack" style={{ marginBottom: '2%' }}>Asignación de secciones a profesores</span>
          <div style={{backgroundColor:'white' ,borderRadius: '15px',paddingTop:'15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
              <AsigSeccionProfes/>
          </div>
        </div> 
      </div> 
    );
  }
