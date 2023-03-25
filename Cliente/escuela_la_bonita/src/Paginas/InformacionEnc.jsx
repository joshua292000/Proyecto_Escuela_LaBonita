import { InfoEncargado } from "../Componentes/InforPersEnc";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
  return (
    <div>
      {" "}
      <Header />
      <div className="Div">
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Información del Encargado</span>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
          <InfoEncargado />
        </div>
      </div>
    </div>
  );
}