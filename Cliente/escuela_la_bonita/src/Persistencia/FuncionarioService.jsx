import axios from 'axios';
import Swal from 'sweetalert2';
import Json from '../Componentes/Globales'
import Cookies from "universal-cookie";
const json = Json;
const cookies = new Cookies(); 

export const Obtener_Secciones = async () => {
  try {
    const res = await axios
      .get("http://localhost:3000/Constancia/" + cookies.get('Func_Id'))
      
        if (res.data.length >0) {
          return res.data;
        } else {
          Swal.fire('Error', 'Seccion no encontrada');
        }
      
  } catch (e) {
    console.log(e);
  }
};

export const ObtenerProfesor = async (props) => {
  console.log(props.state.cedula)
  // try{
  await axios.get('http://localhost:3000/obtenerFuncionario/' + props.state.cedula).then(res => {
    //props.setState({...props.state, mapEstudiante: res.data});
    console.log(res.data);
    if (res.data.length === 0) {
      Swal.fire('Error', 'El estudiante no se encuentra registrado');
    } else {
      // eslint-disable-next-line array-callback-return
      res.data.map((dep) => {
        props.setState({
          ...props.state, fechNac: new Date(dep.fechaNaci),
          ...props.state, pNombre: dep.PNombre,
          ...props.state, sNombre: dep.SNombre,
          ...props.state, pApellido: dep.PApellido,
          ...props.state, sApellido: dep.SApellido,
          ...props.state, provincia: dep.Provincia,
          ...props.state, canton: dep.Canton,
          ...props.state, distrito: dep.Distrito,
          ...props.state, direccion: dep.Direccion,
          ...props.state, sexo: dep.Sexo,
          ...props.state, lugarnacimiento: dep.Pais,
          ...props.state, estadoCivil: dep.EstadoCivil,
          ...props.state, Perfil: dep.Foto,
          ...props.state, Nescolar: dep.Escolaridad,
          ...props.state, fechIng: new Date(dep.fechaIngre),
          ...props.state, lugarTrabajo: dep.Institucion,
          ...props.state, Atrabajo: dep.Experiencia,
          ...props.state, descrip: dep.Descripcion
        });
      })
    }
  })
}
export const ObtenerCont = async (props) => {

  try {
    await axios.get('http://localhost:3000/obtenerContactoxcedula/' + props.idFun).then(res => {
      console.log("Datos en contacto ", props.idFun);
      console.log(res.data);
      props.setState({
        ...props.state, numTelefono: res.data[0].contacto,
        ...props.state, cElectronico: res.data[1].contacto
      })

    })
  } catch (e) {
    console.log(e);
  }
}

export const ObtenerInstitucion = async () => {

  try {
    const res = await axios
      .get("http://localhost:3000/obtenerisntitucion")
    console.log("tiene los datos ", res.data)
    for (let i = 0; i < res.data.length; i++) {
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
}

export const agregarFun = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfas.
  var infop = {
    cedula: props.state.cedula,
    institucion: props.state.lugarTrabajo,
    escolaridad: props.state.Nescolar,
    experiencia: props.state.Atrabajo,
    fechaIngreso: props.state.fechIng.toLocaleDateString('zh-Hans-CN'),
    foto: props.state.Perfil,
    descripcion: props.state.descrip
  }
  console.log("Verctor de datos a guardar: ", infop)

  try {
    await axios.post('http://localhost:3000/insertarFuncionario', infop).then(res => {
      console.log(res.data);
      res.data[1].map((dep) => { //se mapea la respuesta del servidor
        if (dep.error != null) {//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          Swal.fire('Error', dep.error);//se muestra el error en pantalla
        }
        json.insertEstError = dep.error;
      })

    });


  } catch (e) {
    console.log(e);

  }
}

export const agregarPersona = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfas.
  var infop = {
    cedula: props.state.cedula,
    pNombre: props.state.pNombre,
    sNombre: props.state.sNombre,
    pApellido: props.state.pApellido,
    sApellido: props.state.sApellido,
    fechNaci: props.state.fechNac.toLocaleDateString('zh-Hans-CN'),
    estCivil: props.state.estadoCivil,
    sexo: props.state.sexo,
    estado: "A",
    nacionalidad: props.state.lugarnacimiento,
    nomProvincia: props.state.provincia,
    nomCanton:  props.state.canton,
    nomDistrito: props.state.distrito,
    direccion: props.state.direccion
  }
  console.log("Verctor de datos a guardar: ", infop)

  try {
    await axios.post('http://localhost:3000/insertarPersona', infop).then(res => {
      console.log(res.data);
      res.data[1].map((dep) => { //se mapea la respuesta del servidor
        if (dep.error != null) {//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          Swal.fire('Error', dep.error);//se muestra el error en pantalla
        }
        json.insertEstError = dep.error;
      })

    });


  } catch (e) {
    console.log(e);

  }
}

export const agregarContacto = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfas.
  var infop = {
    cedulaPer: props.cedula,
    tipoContacto: props.tCotacto,
    contacto: props.contacto,
  }
  console.log("Verctor de datos a guardar: ", infop)

  try {
    await axios.post('http://localhost:3000/insertarContacto', infop).then(res => {
      console.log(res.data);
      res.data[1].map((dep) => { //se mapea la respuesta del servidor
        if (dep.error != null) {//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          Swal.fire('Error', dep.error);//se muestra el error en pantalla
        }
        json.insertEstError = dep.error;
      })

    });


  } catch (e) {
    console.log(e);
  }
}

export const Obtener_Persona_Rol = async () => {
  try {
       const res = await axios
      .get("http://localhost:3000/Constancia/BusquedaRol/Directora")
        if (res.data.length >0) {
         
          return res.data;
        } else {
          Swal.fire('Error', 'El funcionario no fue encontrado');
        }
      
  } catch (e) {
    console.log(e);
  }
};


export const BusquedaCedula = async (cedula) => {
  try {
       const res = await axios
      .get("http://localhost:3000/Constancia/BusquedaId/" + cedula)
        if (res.data.length >0) {
          
          return res.data;
        } else {
          Swal.fire('Error', 'El estudiante no fue encontrado, digite nuevamente el numero de cedula');
        }
      
  } catch (e) {
    console.log(e);
  }
};


export const ObtenerAusencias = async (props) => {
 
  try {
       const res = await axios
      .get("http://localhost:3000/Reporte/"+props.FechaIni+"/"+props.FechaFin+"/"+props.Grado+"/"+props.Seccion+"/"+props.Materia)
        if (res.data.length >0) {
        
          return res.data;
        } else {
          Swal.fire('Error', 'El estudiante no fue encontrado, digite nuevamente el numero de cedula');
        }
      
  } catch (e) {
    console.log(e);
  }
};

export const ObtenerAsistenciaIndividual = async (props) => {
  console.log("La asi individual ", props)
  try {
       const res = await axios
      .get("http://localhost:3000/ReporteIndividual/"+props.FechaIni+"/"+props.FechaFin+"/"+props.Identificacion+"/"+props.Grado+"/"+props.Seccion+"/"+props.Materia)
        if (res.data.length >0) {
         
          return res.data;
        } else {
          Swal.fire('Error', 'Asistencia no generada');
        }
      
  } catch (e) {
    console.log(e);
  }
};

export const Obtener_Materias = async () => {
  try {
    const res = await axios
      .get("http://localhost:3000/ObtenerMaterias/" + cookies.get('Func_Id'))
      
        if (res.data.length >0) {
          return res.data;
        } else {
          Swal.fire('Error', 'materias no encontradas');
        }
      
  } catch (e) {
    console.log(e);
  }
};

  export const obtenerAlumnos = async (props) => {
    //Obtiene todos los alumnos
    try {
      const res = await axios.get(
        "http://localhost:3000/obtenerAlumnos/" +
          props.grado +
          "/" +
          props.seccion
      );
      if (res.data.length > 0) {
        console.log("metodo ", res.data);
        return res.data;
      } else {
        Swal.fire("Error", "Ocurrió un error al obtener la lista");
      }
    } catch (e) {
      console.log(e);
    }
  };


  export const AsistenciaComedor = async (props) => {
    try {
         const res = await axios
        .get("http://localhost:3000/Asistencia_Comedor/"+props.FechaIni+"/"+props.FechaFin)
          if (res.data.length >0) {
           
            return res.data;
          } else {
            Swal.fire('Error', 'Asistencia no generada');
          }
        
    } catch (e) {
      console.log(e);
    }
  };