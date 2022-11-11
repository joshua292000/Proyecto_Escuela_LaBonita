import { ButtonSiguiente } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Estilos.css"
import Cookies from "universal-cookie";
import Constancia from '../Recursos/Constancia.png';


export default function Inicio() {
  const navegar = useNavigate();

    return (
      <div className="Div">
        <h1>Página de inicio</h1>
        <ButtonSiguiente dir="informacionpersonal" nom="Matricula" css="button_Matricula " />
        <div id = "Constancia">
          <img src={Constancia} alt="Escuela Rodrigo Facio Brenes" width="200px" 
             onClick={()=> navegar("/Constancias")}
          />
          <h1>Generar constancia</h1>
        </div>
      </div>
    );
  }