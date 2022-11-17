/* eslint-disable array-callback-return */
import axios from 'axios';
import Swal from 'sweetalert2';


export const ObtenerEncargado = async(props)=>{ 
    console.log("param", props.idEncar)
    try{
       const res = await axios.get('http://localhost:3000/obtenerEncargado/'+props)
        console.log("Res",res.data[0]);
       return res.data[0];       
     }catch(e){
    console.log(e);
    }
}

export const ObtenerEncargadosEstu = async(props)=>{ 
    try{
       const res = await axios.get('http://localhost:3000/ObtenerEncargadosXidEst/'+props.idEst)
        //console.log("Res",res.data);
       return res.data;       
     }catch(e){
    console.log(e);
    }
}


export const ObtenerContEncargado = async (props)=>{ 
  
    try{
        await axios.get('http://localhost:3000/obtenerConEncargado/'+props.idEncar).then(res =>{
            console.log("Datos en contacto ");
        console.log( res.data);
             props.setState({...props.state, numTelefono: res.data[0].contacto,
                             ...props.state, cElectronico: res.data[1].contacto})
       
        })
    }catch(e){
    console.log(e);
    }
}
