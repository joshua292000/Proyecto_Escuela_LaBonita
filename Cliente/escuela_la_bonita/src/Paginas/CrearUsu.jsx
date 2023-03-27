import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { CrearUsuario } from "../Componentes/CrearUsuario";

export function CrearUsu() {
  return (
    <div>
    <Header />
    <div id="ReportesComedor" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Crear Usuario</span>
      <CrearUsuario  />
    </div>
    </div>
  );
}