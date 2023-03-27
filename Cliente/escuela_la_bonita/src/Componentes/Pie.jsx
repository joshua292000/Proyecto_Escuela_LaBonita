// src/comopnents/Footer.js

import React from 'react';
import Correo from '../Recursos/correo.png';
import Telefono from '../Recursos/fax.png';
import Direccion from '../Recursos/Direccion.png';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

import "../Estilos.css";

const Footer = () => {
   /* return (

        <div className="bg-[#FA7D19] text-white">
            <footer className="footer p-10 justify-items-center">
                <div>
                
                    <img src={Telefono} alt="Telefax" width="50px" style={{ marginLeft: '18px' }} />
                    <span className="footer-title">Telefax: </span>
                    <a className="link link-hover">2770-1253 </a>
                        
                    <img src={Correo} alt="Correo" width="60px" style={{ marginLeft: '100px' }}/>
                    <span className="footer-title">Correo: </span>
                    <a className="link link-hover">esc.rodrigofaciobrenes@mep.go.cr</a>

                    <img src={Direccion} alt="Direccion" width="60px" style={{ marginLeft: '100px' }}/>
                    <span className="footer-title">Dirección: </span>
                    <a className="link link-hover">2,5 km noroeste de la Universidad Nacional</a>
                    

                </div>
                
            </footer>
            <div className="text-center py-8">
                <p>Copyright © 2022 - Todos los derechos reservados.</p>
            </div>
        </div>
    );*/

return(
    
    <footer className="footer">
    <Container>
      <Row>
        <Col md={4}>
          <h5>Dirección</h5>
          <ul className="list-unstyled">
            <li>
              <img src={Direccion} alt="Address" width="50px" /> 2,5 km noroeste de la Universidad Nacional<br />
              
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Telefax</h5>
          <ul className="list-unstyled">
            <li>
              <img src={Telefono} alt="Phone" width="50px" /> 2770-1253
            </li>
          </ul>
        </Col>
        <Col md={4}>
          <h5>Correo</h5>
          <ul className="list-unstyled">
            <li>
              <img src={Correo} alt="Email" width="50px" /> <a href="mailto:esc.rodrigofaciobrenes@mep.go.cr">esc.rodrigofaciobrenes@mep.go.cr</a>
            </li>
          </ul>
        </Col>
      </Row>
      <hr className="w-100" />
      <Row>
        <Col md={6}>
          <span className="text-muted" >Copyright © 2023 - Todos los derechos reservados.</span>
        </Col>
        <Col md={6}>
            <ul className="list-inline social-buttons" style={{marginBottom: "-10px"}}>
              <li className="list-inline-item">
                <a href="https://www.facebook.com/profile.php?id=100044195210256">
                  <FaFacebookF />
                </a>
              </li>
              <li className="list-inline-item">
                <a href={`https://wa.me/${84687044}`}>
                  <FaWhatsapp />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  
  
);

};

export default Footer;