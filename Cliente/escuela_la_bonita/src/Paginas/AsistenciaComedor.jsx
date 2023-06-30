import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "../Estilos.css";
import { AsistenciaComedorCom } from "../Componentes/AsistenciaComedorCom";
import { Header } from "../Componentes/Cabecera";
import "bootstrap/dist/css/bootstrap.min.css";

export function AsistenciaComedor() {
  
  return (
    <div>
    {" "}
    <Header />
    <div  className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Asistencia Comedor</span>
      <AsistenciaComedorCom/>
    </div>
    </div>
  );
  
}