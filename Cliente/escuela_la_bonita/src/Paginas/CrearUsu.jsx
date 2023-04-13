import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { CrearUsuario } from "../Componentes/CrearUsuario";

export function CrearUsu() {
  return (
    <div>
    <Header />
    <div  >
      <CrearUsuario  />
    </div>
    </div>
  );
}