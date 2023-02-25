import React from 'react';
//import './style.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { Menubar } from 'primereact/menubar';
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import { withRouter } from 'react-router'
import "../Estilos.css";
import Logo from "../Recursos/Escudo_escuela.png";

export function Header() {

   const navegar = useNavigate(); 

   function scrollToSection() {
      window.location.hash = '#Mision';
    }

   function scrollToSection2() {
      window.location.hash = '#Junta';
    }
   

const items = [
     {
       label:'Inicio',
       icon:'pi pi-fw pi-power-off',
       command:(event)=>{navegar("/")}
    }, 
    {
       label:'Acerca de',
       Image:'../Resources/escuela.png',
       items:[
           {
             label:'Historia',
             icon:'pi pi-fw pi-align-left',
             command:(event)=>{navegar("/AcercaDe")},
          },
          {
             label:'Misión y visión',
             icon:'pi pi-fw pi-align-right',
             //command:(event)=>{navegar("/AcercaDe/#Mision")},
             command:(event)=>{scrollToSection()}
          },
          {
             label:'Junta Directiva',
             icon:'pi pi-fw pi-align-center',
             command:(event)=>{scrollToSection2()}
          },

       ]
    },
    {
       label:'Proyectos',
       icon:'pi pi-fw pi-pencil',
    },
    {
       label:'Encargados',
       icon:'pi pi-fw pi-user',
       command:(event)=>{navegar("/RegistroEncargados");}
    },
    {
       label:'Funcionarios',
       icon:'pi pi-fw pi-calendar',
       //command:(event)=>{navegar("/RegistroProfesor")}
       //command:(event)=>{navegar("/Loggin")}
       //onclick: ()=>navegar("/Loggin")
       items:[
         {
           label:'Iniciar Sesion',
           icon:'pi pi-fw pi-align-left',
           command:(event)=>{navegar("/Loggin")}
        },
        {
           label:'Inicio',
           icon:'pi pi-fw pi-align-right',
           command:(event)=>{navegar("/Inicio")}
        },

     ]
    
    },
  
 ];

 

  return (
    <div>
      <img src={Logo} alt="Escuela Rodrigo Facio Brenes" width="100px" />
      <span className="TituloP">Escuela Rodrigo Facio Brenes</span>
      <Menubar model={items} />
      <br></br>
    </div>
  );
}





//export default Header;
