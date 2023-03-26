import { useNavigate } from "react-router-dom";
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';


export const msjErrorServidor = "Se produjo un error al conectar con el servidor";

export const tiempoCargando = 300;

export function ButtonSiguiente(props) {
  const navegar = useNavigate();
  const acciones = () => {
    navegar("/" + props.dir);
  };

  return (
    <div >
          <Button  icon={props.icono} className="p-button-sm p-button-rounded p-button-info" onClick={acciones}/>
      <br />
    </div>
  );
}



export function Cargando() {
    return (
        <div className="card flex justify-content-center">
            <ProgressSpinner  animationDuration="3s"/>
        </div>
    );
}

