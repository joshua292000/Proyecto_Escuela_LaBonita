import {createContext,useState} from 'react';

//const infoEncargado = createContext();

const ProviderInfoEncargado = ({ children }) =>{
    const [stateEnc,setstateEnc] = useState([]);

    return (            
            <infoEncargado.Provider value={[stateEnc,setstateEnc]}>

                     {children}
  
            </infoEncargado.Provider>  
             
            
    );
}

export default ProviderInfoEncargado;
export const infoEncargado = createContext();//datos personales del encargado
