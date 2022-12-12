import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { ReporteCom } from "../Componentes/ReportesCom";
export function Reporte() {
  return (
    <div>
    {" "}
    <Header />
    <div id="Reportes" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Reportes</span>
      <ReporteCom  />
    </div>
    </div>
  );
}