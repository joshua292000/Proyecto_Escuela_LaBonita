import {useNavigate} from "react-router-dom";


export function ButtonSiguiente(dir){
    
    const navegar = useNavigate();
    const link = ()=>{
        navegar("/"+dir.dir);
    }
    return(
        <div>
         <button type="button" className={dir.css} onClick={link}>{dir.nom}</button><br />
        </div>
       );
}

export function TXT_info(){
return(
    <div>
    <input type="text" required></input><br></br>
    </div>
)
}