import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { CrearActividadesDiarias } from "../Componentes/CrearActividadesDiarias"; 
export function CrearActividadesD() {
  return (
    <div>
    {" "}
    <Header />
    <div id="Reportes" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Crear Actividades Diarias</span>
      <CrearActividadesDiarias  />
    </div>
    </div>
  );
}