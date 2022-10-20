
/*
import React from 'react';

const Header = () => {
    return (
        <div className="navbar bg-[#FA7D19] text-white  px-16">
            <div className="flex-1">
                <a href="#" className="btn btn-ghost normal-case text-3xl">Bienvenidos a la escuela Rodrigo Facio Brenes</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0 font-bold">
                    <li><a>Profesores</a></li>
                    <li><a>Acerca de</a></li>
                    <li><a>Encargados de familia</a></li>
                    <li><a>Contactenos</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;*/

import React from 'react';
//import './style.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   
import { Menubar } from 'primereact/menubar';
import { Carousel } from "primereact/carousel";
import { useNavigate } from "react-router-dom";
import { withRouter } from 'react-router'

export function Header() {

   const navegar = useNavigate();
   

const items = [
     {
       label:'Inicio',
       icon:'pi pi-fw pi-power-off'
    }, 
    {
       label:'Acerca de',
       Image:'../Resources/escuela.png',
       items:[
           {
             label:'Historia',
             icon:'pi pi-fw pi-align-left'
          },
          {
             label:'Misión y visión',
             icon:'pi pi-fw pi-align-right'
          },
          {
             label:'Junta Directiva',
             icon:'pi pi-fw pi-align-center'
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
    },
    {
       label:'Funcionarios',
       icon:'pi pi-fw pi-calendar',
       command:(event)=>{navegar("/Loggin")}
       //onclick: ()=>navegar("/Loggin")
       
    
    },
  
 ];

 

  return (
    <div>
    <h1>Escuela Rodrigo Facio Brenes</h1>
      <Menubar model={items} /> 
      <br></br>
    </div>
  );
}





//export default Header;
