import { ButtonSiguiente } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "../Estilos.css"
import Cookies from "universal-cookie";
import Constancia from '../Recursos/Constancia.png';
import Asistencia from "../Recursos/Asistencia.png";
import Matricula from "../Recursos/Matricula.png";

export default function Inicio() {
  const navegar = useNavigate();

    return (
      <div className="Div">
        <h1>Página de inicio</h1>
        <div id="Matricula">
          <img
            src={Matricula}
            alt="Matricula"
            width="200px"
            onClick={() => navegar("/Informacionpersonal")}
          />
          <h1>Matrícula</h1>
        </div>

        <div id="Constancia">
          <img
            src={Constancia}
            alt="Constancias"
            width="200px"
            onClick={() => navegar("/Constancias")}
          />
          <h1>Generar constancia</h1>
        </div>
        <div id="Asistencia">
          <img
            src={Asistencia}
            alt="Asistencia"
            width="200px"
            onClick={() => navegar("/AsistenciaEstudiantes")}
          />
          <h1>Control de asistencia</h1>
        </div>
      </div>
    );
  }