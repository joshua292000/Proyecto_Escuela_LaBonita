import "../style.css";
import "../Estilos.css";
//import "../EstiloTablaPDF.scss"
import { Header } from "../Componentes/Cabecera";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import imgPdf from "../Recursos/pdf.png"
export function Horarios() {

    const [pdfs, setPdfs] = useState([]);
    const [pdfs2, setPdfs2] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/horario')
      .then(response => {
        console.log("data trae ",response.data);
        setPdfs(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  console.log("pdfs ",pdfs.map(pdf=>(pdf.filename)) );
  return (
    <div>
      {" "}
      <Header />
      <div>
        <div>
       <div className="table-users" >
       <div className="headerPDF">Horarios para descargar</div>
        <table cellspacing="0">
        <tr>
          <th>Archivo</th>
          <th>Nombre del archivo</th>
          <th>Descargar</th>
        </tr>
      <tbody >
        {pdfs.map(pdf => (
          <tr key={pdf.filename} >
            <td><img className="imgPdf" src={imgPdf} alt="" /></td>
            <td >Horario de la sección: {pdf.filename}</td>
            <td><a style={{color: "red"}} href={`http://localhost:3000/horarios/${pdf.filename}`} download>Descargar</a></td>
          </tr>
        ))}
      </tbody>
    </table>
</div>
        </div>
      </div>
    </div>
  );
}