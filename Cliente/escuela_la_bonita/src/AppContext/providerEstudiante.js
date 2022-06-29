import {createContext,useState} from 'react';

const ProviderInfoEstudiante = ({ children }) =>{
    const [state,setState] = useState({
                               mapEstudiante: []
    });
    return (            
            <infoEstudiante.Provider value={[state,setState]}>
                {children}
            </infoEstudiante.Provider>  
    );
}


export default ProviderInfoEstudiante;
export const infoEstudiante = createContext();