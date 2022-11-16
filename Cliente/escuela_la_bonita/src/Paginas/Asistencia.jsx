import React, { useState,useEffect } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import Logo from "../Recursos/Escudo_escuela.png";
import "../Estilos.css";
import { Button } from "primereact/button";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap";
import { RadioButton } from "primereact/radiobutton";
import { async } from "q";
import { obtenerAlumnos, Obtener_Materias, Obtener_Secciones } from "../Persistencia/FuncionarioService";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export function Asistencia() {
  const [materia,setMateria]=useState([]);
  const [materiaS, setMateriaS] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [seccionS, setSeccionS] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [loading1, setLoading1] = useState(false); 
 const [date, setDate] = useState(null);

  useEffect (()=>{
    const obtenerDatos=async()=>{
      const res = await Obtener_Materias();
      const res1 = await Obtener_Secciones();
      console.log("res:", res);
      console.log("res1:", res1);
      setMateria(res);
      setSeccion(res1);
    }
    obtenerDatos()
  },[])
  
  const obtenerA = async() => {
    console.log(seccionS);
    const res2=await obtenerAlumnos(seccionS);
    console.log("res2:",res2)
    setAlumnos(res2);
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 2000);
  };

  const selectedSeccionesTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <label>{option.grado + " " + option.seccion}</label>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  const seccionOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <label>{option.grado + " " + option.seccion}</label>
      </div>
    );
  };
  return (
    <div>
      {" "}
      <div>
        <img src={Logo} alt="Escuela Rodrigo Facio Brenes" width="100px" />
        <span className="TituloP">Escuela Rodrigo Facio Brenes</span>
      </div>
      <div id="RootAsistencia">
        <div class="row">
          <div class="col">
            <label className="Usuario">Nombre de usuario</label>
          </div>
          <div class="col">
            <label>Fecha:</label>
            <Calendar
              id="icon"
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
              dateFormat="yy-mm-dd"
            />
            {"  "}
          </div>
          <div class="col">
            <label>Seccion:</label>
            <Dropdown
              name="label"
              value={seccionS}
              optionLabel="grado"
              valueTemplate={selectedSeccionesTemplate}
              itemTemplate={seccionOptionTemplate}
              options={seccion}
              onChange={(e) => setSeccionS(e.value)}
              placeholder="Seleccione el grado"
            />
          </div>
          <div class="col">
            <label>Materia:</label>
            <Dropdown
              value={materiaS}
              optionLabel="materia"
              optionValue="materia"
              options={materia}
              onChange={(e) => setMateriaS(e.value)}
              placeholder="Selecione la materia"
            />
            {"  "}
          </div>
          <div class="col">
            <Button
              label="Cargar lista"
              id="cargarlista"
              className="p-button-sm"
              icon="pi pi-check"
              loading={loading1}
              onClick={obtenerA}
            />
          </div>
        </div>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Cédula</th>
              <th>Nombre completo</th>
              <th>Presente</th>
              <th>Ausencia Injustificada</th>
              <th>Ausencia Justificada</th>
              <th>Motivo de la ausencia:</th>
            </tr>
          </thead>
          <tbody>
            {alumnos ? (
              alumnos.map((dt, i) => {
                return (
                  <tr key={i}>
                    <td>{dt.cedula}</td>
                    <td>
                      {dt.pnombre +
                        " " +
                        dt.snombre +
                        " " +
                        dt.papellido +
                        " " +
                        dt.sapellido}
                    </td>
                    <td>
                      <input
                        type="radio"
                        value="true"
                        id="Presente"
                        name="asistenciaest"
                      ></input>
                    </td>
                    <td>
                      {"    "}
                      <input
                        type="radio"
                        id="AusenciaI"
                        name="asistenciaest"
                      ></input>
                    </td>
                    <td>
                      {"   "}
                      <input
                        type="radio"
                        id="AusenciaJ"
                        name="asistenciaest"
                      ></input>
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>
                  <span>Sin resultados </span>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
