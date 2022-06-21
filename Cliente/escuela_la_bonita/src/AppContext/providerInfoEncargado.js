import {createContext,useState} from 'react';

const ProviderInfoEncargado = ({ children }) =>{
    const [state,setState] = useState({});
    return (            
            <infoEncargado.Provider value={[state,setState]}>
                {children}
            </infoEncargado.Provider>  
    );
}

export default ProviderInfoEncargado;
export const infoEncargado = createContext();