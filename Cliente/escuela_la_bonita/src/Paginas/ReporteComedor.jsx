import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { ReporteComedorCom } from "../Componentes/ReportesComedorCom";

export function ReporteComedor() {
  return (
    <div>
    <Header />
    <div id="ReportesComedor" className="Div" >
      <span className="titleBlack" style={{ marginBottom: '2%' }}>Reporte comedor</span>
      <ReporteComedorCom  />
    </div>
    </div>
  );
}