import {createContext,useState} from 'react';

const ProviderInfoProfesor = ({children}) => {
    const [state, setState]=useState({});
    return(
        <infoProfesores.Provider value ={[state,setState]}>
            {children}
        </infoProfesores.Provider>
    );
}

export default ProviderInfoProfesor;
export const infoProfesores= createContext();