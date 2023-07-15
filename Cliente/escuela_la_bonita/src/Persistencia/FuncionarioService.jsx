import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from "universal-cookie";
import { msjErrorServidor } from '../Componentes/Utils';
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
  await axios.get('http://localhost:3000/obtenerFuncionario/' + props.estado + '/'+ props.state.cedula).then(res => {
    //props.setState({...props.state, mapEstudiante: res.data});
    console.log(res.data);
    if (res.data.length === 0) {
      Swal.fire('Error', 'El estudiante no se encuentra registrado');
    } else {
      console.log("trae al funci ", res.data)
      // eslint-disable-next-line array-callback-return
      res.data.map((dep) => {
        props.setState({
          ...props.state, fechNac: dep.fechaNaci,
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
          ...props.state, fechIng: dep.fechaIngre,
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

export const GuardarFoto = async (props) => {
  console.log("Foto ", props.image);
  console.log("Cedula ", props.cedula);
  const formData = new FormData();
  formData.append('image', props.image);
  formData.append('cedula', props.cedula);
  console.log("Foto ",formData);
  axios.post('http://localhost:3000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log(response.data);
  })
    .catch(error => {
      Swal.fire('Error', '');
      console.error(error);
    });
}
export const ObtenerFunMostrar = async () => {

  try {
    const res = await axios.get('http://localhost:3000/MostrarFuncionario');
    console.log("Funcionarios", res.data);
    if (res.data.length > 0) {
      return res.data;
    } else {
      return null;
    }

  } catch (e) {
    console.log(e);
  }
}

export const ObtenerImgFunc = async (props) => {
  try {
    const res = await axios.get('http://localhost:3000/ImagenFuncionario/' + props, { responseType: 'blob' })
    console.log("Imagen ", res.data);
    if (res.data) {
      return URL.createObjectURL(res.data);
    } else {
      return null;
    }

  } catch (e) {
    console.log("Error ", e);
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
    fechaIngreso: props.state.fechIng,
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
      })

    });


  } catch (e) {
    console.log(e);

  }
}

export const Eliminarfun = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfas.
  var infop = {
    cedula: props.state.cedula
  }
  console.log("Verctor de Eliminación: ", props.state.cedula)

  try {
    await axios.post('http://localhost:3000/eliminarFuncionario', infop).then(res => {
      console.log(res.data);
      res.data[1].map((dep) => { //se mapea la respuesta del servidor
        if (dep.error != null) {//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          Swal.fire('Error', dep.error);//se muestra el error en pantalla
        }
      })

    });


  } catch (e) {
    console.log(e);

  }
}


export const InsertarMateria = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfas.
  var infop = {
    materia: props.materia,
    cedula: props.state.cedula
  }
  console.log("Verctor de Eliminación: ", infop)
  try {
    await axios.post('http://localhost:3000/InsertarMateria', infop).then(res => {
      console.log(res.data);
      res.data[1].map((dep) => { //se mapea la respuesta del servidor
        if (dep.error != null) {//se valida el valor de error, si es diferente de null es porque ocurrió un error en la inserción
          Swal.fire('Error', dep.error);//se muestra el error en pantalla
        }
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
    fechaNaci: props.state.fechNac,
    estadoCivil: props.state.estadoCivil,
    sexo: props.state.sexo,
    estado: "A",
    lugarNacimiento: props.state.lugarnacimiento,
    provincia: props.state.provincia,
    canton: props.state.canton,
    distrito: props.state.distrito,
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
      })

    });


  } catch (e) {
    console.log(e);

  }
}

export const agregarContacto = async (props) => {
  console.log(props.state);
  //falta ingresar unas varas en interfaz.
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

export const Obtener_Lista_materia = async () => {
  try {
       const res = await axios
      .get("http://localhost:3000/ListarMateria")
        if (res.data.length >0) {
          console.log("Respuesta materias "+res.data.materia);
          return res.data;
        } else {
          Swal.fire('Error', 'No se encontraron materias');
        }
      
  } catch (e) {
    console.log(e);
  }
};

export const Obtener_Lista_roles = async () => {
  try {
       const res = await axios
      .get("http://localhost:3000/ListarRoles")
        if (res.data.length >0) {
          console.log("Respuesta materias "+res.data);
          return res.data;
        } else {
          Swal.fire('Error', 'No se encontraron los roles');
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


export const obtenerAsistencia = async (props) => {
  try {
    const res = await axios.get("http://localhost:3000/obtenerAsistencia/" + props.materia + "/" + props.seccion + "/" + props.grado + "/" + props.fechaA);
    if (res.data.length > 0) {
      console.log("metodo ", res.data);
      return res.data;
    } else {
      // Ejecutar la función obtenerAlumnos en caso de error
    Swal.fire("Aviso", "El registro de la asistencia no existe, debe crear una asistencia nueva");
    const alumnos = await obtenerAlumnos(props);
    return alumnos;
    }
  } catch (error) {
    console.log(error);
    
  }
};

export const obtenerAlumnos = async (props) => {
  //Obtiene todos los alumnos
  try {
    const res = await axios.get("http://localhost:3000/obtenerAlumnos/" + props.grado +"/" + props.seccion);
    if (res.data.length > 0) {
      //se le asigna un estado inicial a la asistencia
      for(let i=0; i < res.data.length; i++){
        res.data[i].tasistencia = "Presente";
      }
      return res.data;
    } else {
      Swal.fire("Error", "Lo siento, ocurrió un error al obtener la lista");
    }
  } catch (e) {
    console.log(e);
  }
};

export const insertarAsistencia = async (props) => {
  //console.log("date: ", props.fechaA.toLocaleDateString("zh-Hans-CN"));
   var infoA = {
     matrid: props.matrid,
     fechaA: props.fechaA,
     justificacion: props.justificacion || null,
     materia: props.materia,
     tipoAsistencia: props.tasistencia,
   };
    console.log("Vector de datos a guardar: ", infoA);
  try {
    await axios
      .post("http://localhost:3000/insertarAsistencia", infoA)
      .then((res) => {
        console.log(res.data);
        res.data[1].map((dep) => {
          //se mapea la respuesta del servidor
          if (dep.error != null) {
                Swal.fire("Error, la asistencia falló al guardarse");   
          }
          Swal.fire("Asistencia guardada con éxito"); 
        });
      });
  } catch (e) {
    console.log(e);
  }
}


export const CrearActividad = async(props) => {
  
  var infoA = {
    title: props.title,
    title2: props.title,
    description: props.description,
    start: props.start,
    end: props.end,
    title3: props.title, 
    description2: props.description,
    start2: props.start,
    end2: props.end,
    title4: props.title,
  
  };
  console.log("data del service ", infoA); 
  try {
    const res = await axios.post("http://localhost:3000/CrearActividadDiarias", infoA)
    console.log("metodo ", res.status);
          //se mapea la respuesta del servidor
          if (res.status === 201) {
            return res.data;
          } else {
            Swal.fire("Error", "Lo siento, ocurrió un error al crear la actividad");
          }
        
      
  } catch (e) {
    console.log(e);
  }
 
}



export const EliminarActividad = async(props) => {
  console.log("el eliminar trae ", props);
  
  try {
    const res = await axios.delete("http://localhost:3000/EliminarActividadDiaria/"+ props)
    console.log("metodo ", res.status);
          //se mapea la respuesta del servidor  
          if (res.status === 201) {  
            return res.data;    
          } else {
            Swal.fire("Error", "Lo siento, ocurrió un error al eliminar la actividad");
          }
  } catch (e) {   
    console.log(e);
  }
 
}

