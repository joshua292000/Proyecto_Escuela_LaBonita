// src/components/Home/Home.js

// import CSS
import './Home.css';
import { Carousel } from "primereact/carousel";
import React from 'react';

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
                                src="https://scontent.fsjo10-1.fna.fbcdn.net/v/t39.30808-6/301829858_605279847621850_2679330052690748808_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_ohc=HGyyK1Fxf6EAX9aqq6-&_nc_ht=scontent.fsjo10-1.fna&oh=00_AT_FZLk1JOHxLwGdU2RLc6EELeuyTgBrrkBpTrNIwOQdJQ&oe=63549EF9"
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
                                src="https://www.spanishunicorn.com/wp-content/uploads/2018/10/frases-de-motivacion-para-estudiantes-1024x536.jpg"
                        /> 
                    </div>     
                        
                </div>
            </div>
        </div>

        
    );
};

export default Home;