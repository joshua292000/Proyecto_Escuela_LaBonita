// src/comopnents/Footer.js

import React from 'react';
import Correo from '../Recursos/correo.png';
import Telefono from '../Recursos/fax.png';
import Direccion from '../Recursos/Direccion.png';

const Footer = () => {
    return (

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
    );
};

export default Footer;