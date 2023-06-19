import React, { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate} from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";

export function CrearUsuarioFuncionario() {

    const [Identificacion, setIdentificacion] = useState([]);
    const [Clave, setClave] = useState([]);
    const navegar = useNavigate();

    const CrearUsuarioEnc = async () => { 
        try {
            await axios.post("http://localhost:3000/CrearUsuarioFunc", {Identificacion: Identificacion,
        Clave: Clave}).then((res)=>{
                res.data[1].map((dep) => {
                    console.log("res trae: "+dep.error) 
                    if (dep.error != null) {
                        Swal.fire('Error', 'La cedula digitada no es correcta');  
                  }else{
                    Swal.fire('Excelente', 'Su usuario fue creado con exito');
                    navegar("/Loggin");
                  }
               
             });
            });
            
        }catch(e){
            console.log(e);
            }
    };

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