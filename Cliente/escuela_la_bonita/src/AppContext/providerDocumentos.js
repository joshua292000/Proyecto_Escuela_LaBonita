import {createContext,useState} from 'react';

const ProviderDocumentos = ({ children }) =>{
    const [state,setstate] = useState({});

    return (            
            <infoDocumento.Provider value={[state,setstate]}>        
                {children}    
            </infoDocumento.Provider>      
    );
}

export default ProviderDocumentos;
export const infoDocumento = createContext();//datos relacionados con las constancias y reportes
