import { ButtonSiguiente } from "../Componentes/Utils";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import "../style.css";
import "../Estilos.css"
import Constancia from '../Recursos/Constancia.png';
import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Obtener_Secciones } from "../Persistencia/FuncionarioService";

export function Constancias() {
  const cookies = new Cookies();
  const [seccion, setSeccion] = useState([

]);
 

useEffect(() => {
    return () => {
      (
        async () => {
          axios.get("http://localhost:3000/Constancia/" + cookies.get('Func_Id'))
          .then(({data}) => {
            console.log("tiene los datos ", data)
            for(let i = 0; i < data.user.length; i++){   
              const Secciones = {
              grado: data.user[i].grado,
              seccion: data.user[i].seccion,
              };
              setSeccion((pre) => {
                return [...pre, Secciones];
              });
          }
  
          }).catch(({response}) => {
    
         })
        }
      )();
  }
  },[]);



    return (
      <div className="Div">
        <h1>Constancias</h1>
        <div style={{marginLeft:'40%', marginTop: '60px'}}>
      <h3>Greetings from GeeksforGeeks!</h3>
      <Autocomplete
        options={seccion}
        style={{ width: 300 }}
        renderInput={(params) =>
          <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </div>
      </div>
    );
  }