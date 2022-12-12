import { ButtonSiguiente } from "../Componentes/Utils";
import { useContext } from 'react';
import { infoEncargado } from "../AppContext/providerInfoEncargado";
import { InfoEncargado } from "../Componentes/InforPersEnc";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
  const [state, setState] = useContext(infoEncargado);
  return (
    <div>
      {" "}
      <Header />
      <div className="Div">
        <span className="titleBlack" style={{ marginBottom: '2%' }}>Información del Encargado</span>
        <div style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
          <InfoEncargado />
          <div className='container'>
            <div className="row justify-content-between">
              <div className="col-4">
                <ButtonSiguiente dir="Informacionpersonal" nom="anterior" icono="pi pi-arrow-left" />
              </div>
              <div className="col-4">
                <ButtonSiguiente dir="informacionestudiante" nom="Siguiente" icono="pi pi-arrow-right" />
              </div>
            </div>
          </div>

        </div>

        {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      </div>
    </div>
  );
}