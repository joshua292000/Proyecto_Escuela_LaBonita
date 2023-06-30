import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, Col, Button } from "react-bootstrap";
import { useDropzone  } from 'react-dropzone';
import { RiCloseCircleLine } from 'react-icons/ri';
import { FaFilePdf } from 'react-icons/fa';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function SubirPDF() {

    const [pdfFiles, setPdfFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const cookies = new Cookies();
    const navegar = useNavigate();

    useEffect(() => {
      if(!cookies.get('Func_Id')){
          navegar("/");
    
        }
    },[]);

    function handleFileChange(event) {
        setPdfFiles(Array.from(event.target.files));
      }
    
      function handleDrop(acceptedFiles) {
        setPdfFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
      }

     
      function handleDragOver(event) {
        event.preventDefault();
      }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        pdfFiles.forEach(file => {
          formData.append("pdfFiles", file);
        });
        //for (let i = 0; i < pdfFiles.length; i++) {
        //    formData.append('pdfFiles', pdfFiles[i]);
        //  }
        axios.post("http://localhost:3000/horarios", formData)
        .then(response => {
          console.log(response.data);
          Swal.fire("Excelente", "Los horarios se subieron correctamente");
          setPdfFiles([]);
        })
        .catch(error => {
          console.log(error);
          Swal.fire("Error", "Los horarios no se subieron correctamente");
        });
      }

      const handleDeleteFile = (fileIndex) => {
        const updatedFiles = [...pdfFiles];
        updatedFiles.splice(fileIndex, 1);
        setPdfFiles(updatedFiles);
      };

      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop });

return (
  <div>
    <Header />
      <div>
      <div className="long-title">
        <b className="titlehorario">Subir Horarios en PDF</b>
      </div>
  <div className="dropzone-container" {...getRootProps()}>
      <input {...getInputProps()} onChange={handleFileChange}/>
      {isDragActive ? (
        <p>Suelta los archivos aquí...</p>
      ) : (
        <p>Arrastra y suelta archivos PDF aquí</p>
      )}
      <div className="file-list">
        {pdfFiles.map((file, index) => (
          <div key={file.name} className="file-item">
            <span className="file-icon">
              <FaFilePdf size={32}/>
            </span>
            <span className="file-name">{file.name}</span>
            <RiCloseCircleLine 
              size={20}
              className="delete-icon"
              onClick={() => handleDeleteFile(index)}
            />
          </div>
        ))}
      </div>
    </div>
    <div className="button-container">
          <button className="select-button"
          onClick={() => {
            // Activa el cuadro de diálogo de selección de archivos
            const fileInput = document.querySelector("input[type=file]");
            fileInput.click();
            }}
            
          
          >Seleccionar archivos</button>
          <button 
            className="send-button" 
            disabled={pdfFiles.length === 0}
            onClick={handleSubmit}
          >Enviar</button>
    </div>
    </div>
    </div>
  );
}







