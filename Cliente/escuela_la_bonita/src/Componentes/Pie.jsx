// src/comopnents/Footer.js

import React from 'react';

const Footer = () => {
    return (

        <div className="bg-[#FA7D19] text-white">
            <footer className="footer p-10 justify-items-center">
                <div>
                    <span className="footer-title">Escuela </span>
                    <a className="link link-hover">Rodrigo Facio Brenes</a>

                </div>
                <div>
                    <span className="footer-title">Telefax: </span>
                    <a className="link link-hover">2770-1253</a>

                </div>
                <div>
                    <span className="footer-title">Correo: </span>
                    <a className="link link-hover">esc.rodrigofaciobrenes@mep.go.cr</a>
                </div>
            </footer>
            <div className="text-center py-8">
                <p>Copyright © 2022 - Todos los derechos reservados por UNA</p>
            </div>
        </div>
    );
};

export default Footer;