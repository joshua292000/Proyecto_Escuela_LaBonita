import {createContext,useState} from 'react';

const ProviderInfoEstudiante = ({ children }) =>{
    const [state,setState] = useState({});
    return (            
            <inforEstudiante.Provider value={[state,setState]}>
                {children}
            </inforEstudiante.Provider>  
    );
}


export default ProviderInfoEstudiante;
export const inforEstudiante = createContext();