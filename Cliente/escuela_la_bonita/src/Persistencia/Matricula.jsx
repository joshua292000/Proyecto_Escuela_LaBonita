import {AgregarInfoPersonal} from "../Persistencia/InsertarInfoPer";
import { AgregarEst } from "./InsertarEst";
import { useContext } from "react";
import { AppContext } from "../AppContext/provider";
import Swal from 'sweetalert2';

export default function Matricula() {
    const [state, setState] = useContext(AppContext);

    
    AgregarInfoPersonal({value : state});
    AgregarEst({value : state});
    Swal.fire('Felicidades', 'La matricula se creo con éxito')
}