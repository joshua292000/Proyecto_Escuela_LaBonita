import { ButtonSiguiente } from "../Componentes/Utils";
import { useContext } from "react";
import { infoProfesores } from "../AppContext/providerProfesores";
import { InfoPersonal, InfoProfesor } from "../Componentes/InformacionProfe";
import { TabView, TabPanel } from 'primereact/tabview';
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";

export default function Inicio() {
  const [state, setState] = useContext(infoProfesores);
  return (
    <div>
    {" "}
    <Header />
    <div id="rootprofesores" className="Div" >
      <span className="titleBlack">Información personal del profesor</span>
      <TabView   scrollable style={{ textAlign: 'center' }} >
        <TabPanel header="Información Personal" leftIcon="pi pi-user">
          <InfoPersonal setState={setState} state={state} />
        </TabPanel>
        <TabPanel header="Información Profesional y Laboral" leftIcon="pi pi-building">
          <InfoProfesor setState={setState} state={state} />
        </TabPanel>
      </TabView>


      {/* <button type="button" onClick={()=>agregarInfoPersonal({value : state})}> Agregar</button><br /> */}
      
    </div>
    </div>
  );
}