
import Swal from 'sweetalert2';

import { agregarInfoPersonal } from './PersonaServive';
import { agregarEst } from './EstudianteService';

export  function Matricula(propstEst, propsEnc) {
    
    agregarInfoPersonal({value : propstEst.valueEst});
    agregarInfoPersonal({value : propsEnc.valueEnc});
    agregarEst({value : propstEst.valueEst});
    Swal.fire('Felicidades', 'La matricula se creo con éxito')
    
}