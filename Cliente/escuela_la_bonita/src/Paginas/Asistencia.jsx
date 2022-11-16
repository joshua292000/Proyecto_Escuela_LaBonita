import React, { useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import Logo from "../Recursos/Escudo_escuela.png";
import "../Estilos.css";
import { Button } from "primereact/button";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table} from "reactstrap";
import { RadioButton } from "primereact/radiobutton";
 
 
export function Asistencia() {;
    const [loading1, setLoading1] = useState(false);
      const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success mr-2"
            />
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-warning"
            />
          </React.Fragment>
        );
      };
    const onLoadingClick1 = () => {
      setLoading1(true);

      setTimeout(() => {
        setLoading1(false);
      }, 2000);
    };
  return (
    <div>
      {" "}
      <div>
        <img src={Logo} alt="Escuela Rodrigo Facio Brenes" width="100px" />
        <span className="TituloP">Escuela Rodrigo Facio Brenes</span>
      </div>
      <div id="RootAsistencia">
        <label className="Usuario">Nombre de usuario</label>
        {"  "}
        <label>Fecha:</label>{" "}
        <input type="date" name="fasistencia" id="label"></input>
        {"  "}
        <label>Sección:</label>{" "}
        <select name="Seccion" id="label">
          <option value="1-l">1-1</option>
          <option value="1-2">1-2</option>
          <option value="1-3">1-3</option>
        </select>
        <label>Materia:</label>{" "}
        <select name="Materia" id="label">
          <option value="Español">Español</option>
          <option value="Ciencias">Ciencias</option>
          <option value="Estudios Sociales">Estudios Sociales</option>
        </select>
        <Button
          label="Cargar lista"
          id="cargarlista"
          icon="pi pi-check"
          loading={loading1}
          onClick={onLoadingClick1}
        />
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
            <tr>
              <td></td>
              <td></td>
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
                <input type="radio" id="AusenciaI" name="asistenciaest"></input>
              </td>
              <td>
                {"   "}
                <input type="radio" id="AusenciaJ" name="asistenciaest"></input>
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
