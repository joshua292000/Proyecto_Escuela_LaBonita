import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import { withRouter } from 'react-router'
import Logo from "../Recursos/Escudo_escuela.png";
import Cookies from 'universal-cookie';

//import './style.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import "../Estilos.css";


export function Header() {

   const navegar = useNavigate(); 
   const cookies = new Cookies();

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
       command:(event)=>{navegar("/Proyectos");}
    },
    {
       label:'Encargados',
       icon:'pi pi-fw pi-user',
       command:(event)=>{navegar("/LogginEncargados");}
    },
    {
       label:'Funcionarios',
       icon:'pi pi-user-plus',
       command:(event)=>{navegar("/Loggin")},
      
    
    }, 
    {
       label:'Menú de opciones',
       icon:'pi pi-home',
       visible: window.myGlobalLoggin,
       command:(event)=>{navegar("/Inicio")}
       
    },

    {
      label:'Cerrar Sesión',
      icon:'pi pi-sign-out',
      visible: window.myGlobalLoggin,
      command:(event)=>{cookies.remove('Func_Id', { path: '/' });
                        cookies.remove('Rol_Id', { path: '/' });
                        navegar("/")}
      
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
