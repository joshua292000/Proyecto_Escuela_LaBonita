import Cookies from "universal-cookie";
import React, { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import axios from 'axios';
import Swal from 'sweetalert2';
import {Navigate, useNavigate} from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import { Header } from "../Componentes/Cabecera";

export function CrearUsuario() {

    const [Identificacion, setIdentificacion] = useState([]);
    const [Clave, setClave] = useState([]);
    const navegar = useNavigate();

    const CrearUsuarioEnc = async () => {
        try {
            await axios.post("http://localhost:3000/CrearUsuarioEnc", {Identificacion: Identificacion,
        Clave: Clave}).then((res)=>{
                res.data[1].map((dep) => {
                    console.log("res trae "+dep.error)
                    if (dep.error != null) {
                        Swal.fire('Error', 'La cedula digitada no es correcta');  
                  }else{
                    Swal.fire('Excelente', 'Su usuario fue creado con exito');
                    navegar("/LogginEncargados");
                  }
               
             });
            });
            
        }catch(e){
            console.log(e);
            }
    };

   /* return (
        <div>
            <div className="comedor" >
                <div className="container" style={{ backgroundColor: 'white', borderRadius: '15px', border: '15px solid rgb(163, 29, 29, 0.06)' }}>
                    <div className="row">
                        <div className="col-sm">
                            <div className="field">
                            <label><b>Digite su numero de cedula o identificación:</b></label>{" "}
                                <div className="NombreEscuela">
                                    <InputText
                                        id="Escuela"
                                        className="p-inputtext-sm block mb-2"
                                        value={Identificacion}
                                        onChange={(e) => setIdentificacion(e.target.value)}
                                        required
                                        style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                        <label><b>Digite una constraseña</b></label>{" "}
                                <div className="NombreEscuela">
                                    <InputText
                                        id="Escuela"
                                        type="password"
                                        className="p-inputtext-sm block mb-2"
                                        value={Clave}
                                        onChange={(e) => setClave(e.target.value)}
                                        required
                                        style={{ width: '90%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-4">
                            <div className="CargarReportePDFComedor">
                                <Button className="p-button-warning" onClick={CrearUsuarioEnc}>
                                    Crear Usuario
                                </Button>
                            </div>
                        </div>
                    </div>
                    
               
            </div>
        </div>
    );
}

*/

return (
      <div className="container mt-5">
        <Card className="mx-auto" style={{ maxWidth: '350px'}}>
          <Card.Body>
            <Card.Title className="text-center" style={{ color: "blue", fontWeight: "bold", fontSize: "24px" }}>
              Crear Usuario
            </Card.Title>
            <Form>
            <Form.Group controlId="identificacion">
              <Form.Control
                type="text"
                placeholder="Ingrese su número de cedula"
                style={{ borderRadius: "25px"}}
                required
                  value={Identificacion}
                  onChange={(e) => setIdentificacion(e.target.value)}
                
              />
            </Form.Group>
            <br></br>
            <Form.Group controlId="clave">
              <Form.Control
                type="password"
                placeholder="Digite su contraseña"
                style={{ borderRadius: "25px"}}
                required
                  value={Clave}
                  onChange={(e) => setClave(e.target.value)}
              />
            </Form.Group>
            <br></br>
            <Button className="mt-4 mx-auto d-block w-100"  onClick={() => CrearUsuarioEnc()}>
            Crear Usuario
            </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      
      );
  
    }