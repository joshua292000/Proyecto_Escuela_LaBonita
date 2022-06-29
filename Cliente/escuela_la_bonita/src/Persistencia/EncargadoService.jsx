import axios from 'axios';


export function ObtenerEncargado (props){ 
  var cont = 1;

    try{
        console.log("Datos en "+props.cedula+" y "+props.idEncar)
        //+props.state.cedula+ +props.state.idEncar
        axios.get('http://localhost:3000/obtenerEncargado/'+props.cedula+'/'+props.idEncar).then(res =>{
        console.log(res.data);
         res.data[1].map((dep)=>{ 
        //    if(cont >= 2){
            console.log("encargado name "+dep.pNombre);
            props.setState({...props.state, cedula: dep.cedula,
                            ...props.state, fechNac: dep.fechNaci,
                            ...props.state, pNombre: dep.pNombre,
                            ...props.state, sNombre: dep.sNombre,
                            ...props.state, pApellido: dep.pApellido,
                            ...props.state, sApellido: dep.sApellido,
                            ...props.state, provincia: dep.provincia,
                            ...props.state, canton: dep.canton,
                            ...props.state, distrito: dep.distrito,
                            ...props.state, sexo: dep.sexo,
                            ...props.state, lugarnacimiento: dep.nacionalidad,
                            ...props.state, lTrabajo: dep.lugarTrabajo,
                            ...props.state, ocupacion: dep.ocupacion,
                            ...props.state, estadoCivil: dep.estCivil,
                            ...props.state, parentesco: dep.parentezco,
                            ...props.state, escolaridad: dep.escolaridad,
                            ...props.state, viveEST: dep.viveCEstu
                            });
   
            
        //    }
           
                  cont ++;       
                 })
        })

    }catch(e){
    console.log(e);
    }

    

}


export function ObtenerContEncargado (props){ 
  
    try{
        axios.get('http://localhost:3000/obtenerConEncargado/'+props.idEncar).then(res =>{
        console.log("Datos en contacto " , res.data);
            res.data.map((dep)=>{  

              if(dep.Tipo === "Correo"){
                console.log("Aqui hay Correo  "+dep.contacto);
                props.setState({...props.state, cElectronico: dep.contacto});
              }

              if(dep.Tipo === "Telefono"){
                console.log("Aqui hay telefono  "+dep.contacto);
                props.setState({...props.state, numTelefono: dep.contacto});
              }
           
            })
        
    
        })
    }catch(e){
    console.log(e);
    }
}