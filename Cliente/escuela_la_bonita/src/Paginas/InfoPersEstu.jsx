import { ButtonSiguiente} from "../Componentes/Utils";
import { useContext } from "react";
import { infoEstudiante } from "../AppContext/providerEstudiante";
import { InfoPersonal } from "../Componentes/InfoPersEstu";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
  const [state, setState] = useContext(infoEstudiante);
    return (
      <div>
      {" "}
      <Header />
      <div className="Div">
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Información Personal del estudiante</span>
        <div style={{backgroundColor:'white' ,borderRadius: '15px',paddingTop:'15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
          <InfoPersonal setState={setState} state ={state} quien="estudiante"/>
          {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
          <div className='container'>
            <div className="row justify-content-end">
              <div className="col-4">
                <ButtonSiguiente dir="informacionencargado" nom="Siguiente" icono="pi pi-arrow-right" enc="" idEncar={state.idEncargado}/> 
              </div>
            </div>
          </div>
        </div>
        
        </div> 
      </div> 
    );
  }
