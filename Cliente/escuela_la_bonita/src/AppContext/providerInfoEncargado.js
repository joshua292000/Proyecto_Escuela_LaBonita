import {createContext,useState} from 'react';

//const infoEncargado = createContext();

const ProviderInfoEncargado = ({ children }) =>{
    const [stateEnc,setstateEnc] = useState({});
    const [stateCon,setStateCon] = useState({});
    return (            
            <infoEncargado.Provider value={[stateEnc,setstateEnc]}>
                <infoContacto.Provider value={[stateCon,setStateCon]}>
                     {children}
               </infoContacto.Provider>  
            </infoEncargado.Provider>  
             
            
    );
}

export default ProviderInfoEncargado;
export const infoEncargado = createContext();//datos personales del encargado
export const infoContacto = createContext();//informacion de contacto