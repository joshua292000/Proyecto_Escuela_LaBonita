
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "../Estilos.css";
import { Asistenciacom } from "../Componentes/Asistenciacom";
import { Header } from "../Componentes/Cabecera";
import "bootstrap/dist/css/bootstrap.min.css";

export function Asistencia() {
  
  return (
    <div>
    {" "}
    <Header />
    <div id="RootAsistencia" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Asistencia Estudiantil</span>
      <Asistenciacom  />
    </div>
    </div>
  );
  
}
