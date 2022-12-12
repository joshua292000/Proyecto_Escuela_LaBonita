import "../style.css";
import "../Estilos.css";
import { ConstanciasCom } from "../Componentes/ConstanciaCom";
import { Header } from "../Componentes/Cabecera";
export function Constancias() {
  return (
    <div>
    {" "}
    <Header />
    <div id="Constacias" className="Div" >
    <span className="titleBlack" style={{ marginBottom: '2%' }}>Constancias</span>
      <ConstanciasCom  />
    </div>
    </div>
  );
}
