
import { InfoEstudianteMatricula } from "../Componentes/InformacionEstMatri";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export function InfoEstudiante() {

  return (
    <div>
    {" "}
    <Header />
    <div id="rootacademico" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Información académica</span>
      <InfoEstudianteMatricula />
    </div>
    </div>
  );
}
