import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import { CrearUsuarioFuncionario } from "../Componentes/CrearUsuarioFuncionario"; 

export function CrearUsuFuncionario() {
  return (
    <div>
    <Header />
    <div  >
      <CrearUsuarioFuncionario  />
    </div>
    </div>
  );
}