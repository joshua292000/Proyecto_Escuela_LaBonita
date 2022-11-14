import {createContext,useState} from 'react';

const ProviderInfoProfesor = ({children}) => {
    const [state, setState]=useState({});
    const [stateCon,setStateCon] = useState({});
    const [stateFun,setStateFun] = useState({});
    return(
        <infoProfesores.Provider value ={[state,setState]}>
            <infoContacto.Provider value={[stateCon,setStateCon]}>
                    {children}
            </infoContacto.Provider>
        </infoProfesores.Provider>
    );
}

export default ProviderInfoProfesor;
export const infoProfesores= createContext();
export const infoContacto= createContext();