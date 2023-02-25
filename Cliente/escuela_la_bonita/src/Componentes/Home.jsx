// src/components/Home/Home.js

// import CSS
import './Home.css';
import { Carousel } from "primereact/carousel";
import React from 'react';
import Escuela1 from '../Recursos/EscuelaLado.jpg';
import Bienvenidos from '../Recursos/Bienvenidos.png';
const itemTemplate = (product) => {
    // return content;
  };

const Home = (props) => {

    return (
        <div>
            <div id="carrusel-contenido">
                <div id="carrusel-caja">

                    <div class="carrusel-elemento">
                        <img
                            class="imagenes"
                                src={Bienvenidos}
                        />
                    </div>

                    <div class="carrusel-elemento">
                        <img
                            class="imagenes"
                                src="https://th.bing.com/th/id/R.8efdb5e0d478b3f8d79c99bef96226e5?rik=N8U%2bCKpCZAgP%2bQ&pid=ImgRaw&r=0"
                        />
                    </div>

                    <div class="carrusel-elemento">
                        <img
                            class="imagenes"
                                src="https://th.bing.com/th/id/R.3af7a9657b3e62e671437897a5a77c19?rik=h6OMfue0d%2bv3lA&pid=ImgRaw&r=0"
                        /> 
                    </div>     

                    <div class="carrusel-elemento">
                        <img
                            class="imagenes"
                                src={Escuela1}
                        /> 
                    </div>     
                        
                </div>
            </div>
        </div>

        
    );
};

export default Home;