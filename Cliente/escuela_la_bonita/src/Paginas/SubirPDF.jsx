import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import axios from "axios";
import React, { useState } from "react";

export function SubirPDF() {

    const [pdfFiles, setPdfFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    function handleFileChange(event) {
        setPdfFiles(Array.from(event.target.files));
      }
    
      function handleDrop(event) {
        event.preventDefault();
        setPdfFiles(Array.from(event.dataTransfer.files));
      }

     
      function handleDragOver(event) {
        event.preventDefault();
      }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        //pdfFiles.forEach((file) => formData.append("pdfs[]", file));
        for (let i = 0; i < pdfFiles.length; i++) {
            formData.append('pdfFiles', pdfFiles[i]);
          }
        axios.post("http://localhost:3000/horarios", formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      }

   

  return (
    <div>
      {" "}
      <Header />
      <div>
        <div>
        <div className="long-title">
          <h3>Subir Horarios en PDF</h3>
        </div>
        <form onSubmit={handleSubmit}>
      <div className="ContenedorPDFprincipal">
      <div className="ContenedorPDF"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        //style={{  border: "2px dashed #ccc", padding: "100px", width: "1000px",marginLeft: "180px", borderRadius: "5px", backgroundColor: "white"}}
      >
        {pdfFiles.length > 0 ? (
          <ul>
            {pdfFiles.map((file) => (
              <li style={{ textAlign: "center", fontFamily: "Arial" }} key={file.name}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: "80px", fontFamily: "Arial", textAlign: "center" }}>
            Arrastra y suelta varios archivos PDF aquí o haz clic para seleccionar varios.
          </p>
        )}
        <input
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={(input) => {
            // Oculta el cuadro de diálogo de selección de archivos
            if (input) {
              input.value = null;
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            // Activa el cuadro de diálogo de selección de archivos
            const fileInput = document.querySelector("input[type=file]");
            fileInput.click();
          }}
          style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "3px", padding: "10px", cursor: "pointer", fontFamily: "Arial", position: "absolute",  left: "43%"}}
        >
          Seleccionar archivos
        </button>
      </div>
      </div>
      <button type="submit"
       style={{ width:"90px",height:"40px",position:"absolute", left:"580px",bottom:"20px",backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "3px", padding: "10px" ,cursor: "pointer", fontFamily: "Arial" }}
          disabled={pdfFiles.length === 0}
        >Enviar</button>
    </form>
          
        </div>
      </div>
    </div>
  );
}
