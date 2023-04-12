
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Constancia from '../Recursos/Constancia.png';
import { ObtenerFunMostrar, ObtenerImgFunc } from "../Persistencia/FuncionarioService";
import axios from 'axios';
export function DataViewDemo() {
    const [layout, setLayout] = useState('grid');
    const [render, setRender] = useState(false);
    
    const Estado = [
        { name: 'Soltero', image: Constancia, description: '../Recursos/Constancia.png', category: 'Español', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' },
        { name: 'Casado', image: Constancia, description: 'Hola', category: 'Español, Estudios, matematicas, ciencias', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' },
        { name: 'Unión libre', image: Constancia, description: 'Hola', category: 'Español', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' },
        { name: 'Divorciado(a)', image: Constancia, description: 'Hola', category: 'Español', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' },
        { name: 'Viudo(a)', image: Constancia, description: 'Hola', category: 'Español', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' },
        { name: 'Separado(a)', image: Constancia, description: 'Hola', category: 'Español', Telefono: '89264496', Correo: 'kevin.mora.valverde@una.ac.cr' }
    ];

    const [profesor, setProfesor] = useState();
    
    useEffect(() => {
        const obtenerFun = async ()=>{
            const data = await ObtenerFunMostrar();
            if(data !== null){
               await obtenerImg(data);
            }else{
                //va el error del servidor
            }
        }
        obtenerFun();
        
    }, []);
    
 
    const obtenerImg = async (datos) =>{
        let usuarioActualizado = {};
        let usuarios = [];
        for(let i=0; i < datos.length; i++){
            console.log("Cedula "+ datos[i].cedula);
            usuarioActualizado = { ...datos.find(product => product.cedula === datos[i].cedula) };
            usuarioActualizado.Foto = await ObtenerImgFunc(datos[i].cedula);
            const contactos = await usuarioActualizado.Contacto.split(',');
            usuarioActualizado.Telefono = contactos[0];
            usuarioActualizado.Correo = contactos[1];
            usuarios.push(usuarioActualizado);

        }
        console.log("Salio map");
        setProfesor(usuarios);
        setRender(true);

    /*usuariosActualizados.map(async (dep) => {
        console.log("Cedula "+ dep.cedula);
        usuarioActualizado = { ...usuariosActualizados.find(product => product.cedula === dep.cedula) };
        usuarioActualizado.Foto = await ObtenerImgFunc(dep.cedula);
        const contactos = await usuarioActualizado.Contacto.split(',');
        usuarioActualizado.Telefono = contactos[0];
        usuarioActualizado.Correo = contactos[1];
        //usuariosActualizados[usuariosActualizados.findIndex(product => product.cedula === dep.cedula)] = usuarioActualizado;
        usuarios.push(usuarioActualizado);
    })*/
    //console.log("usuario", usuarios);
    
    }

    console.log("Profesor ",profesor);
    

    
    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

/*
useEffect(()=>{
    if(render === false){
    axios.get('http://localhost:3000/MostrarFuncionario')
    .then(response =>{
      
            //y.log("response de funcionarios "+ response.data[1])
            setProfesor(response.data)
            if(response.data !== null){
                    console.log("entre")
                    const usuariosActualizados = [...response.data];
                    response.data.map(async (dep) => {
                       // console.log("la cedula es "+ dep.cedula)
                        await axios.get('http://localhost:3000/ImagenFuncionario/' + dep.cedula, { responseType: 'blob' }) 
                        .then(res =>{

                            //console.log("direccion de la imagen ", URL.createObjectURL(res.data))
                            setImagen(URL.createObjectURL(res.data));
                            //usuarios.push(res.data);
                            const imageUrl = URL.createObjectURL(res.data);
                        // Buscar el usuario  y crear una copia del objeto
                        const usuarioActualizado = { ...usuariosActualizados.find(profesor => profesor.cedula === dep.cedula) };
                        // Modificar la propiedad "Foto" del objeto copiado
                        usuarioActualizado.Foto = imageUrl;
                        // Separar cadena y agregar nuevos campos (Telefono y Correo)
    
                        const contactos =usuarioActualizado.Contacto.split(',');
                        usuarioActualizado.Telefono = contactos[0];
                        usuarioActualizado.Correo = contactos[1];
    
                        // Reemplazar el objeto antiguo con el objeto modificado en la copia del arreglo
                        usuariosActualizados[usuariosActualizados.findIndex(profesor => profesor.cedula === dep.cedula)] = usuarioActualizado;
                        // Actualizar el estado del arreglo con la copia actualizada
                        console.log("usu actualizado es ", usuariosActualizados)
                        setProfesor(usuariosActualizados);
                        
                            
                        })
                    })        
            //axios.get('http://localhost:3000/ImagenFuncionario/' + profesor.map(profe=>(profe.cedula)), { responseType: 'blob' })
           
            }
        
        //setProfesor(response.data)
        
    })
    setRender(true);}
},[])
*/

    const listItem = (profesor) => {
        return (
            <div className="col-7">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="flex align-items-center gap-3">
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{profesor.MNombre}</span>
                        </span>
                        <Tag value={profesor.inventoryStatus} severity={getSeverity(profesor)}></Tag>
                    </div>
                    {profesor.Foto && <img className="w-9 shadow-2 border-round" alt="Selected image" src={profesor.Foto} 
                    style={{ borderRadius: "100%"}} width={'40%'}/>}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{profesor.Nombre}</div>
                            <div className="text-2xl font-bold">{profesor.Descripcion}</div>

                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">{"Tel: "+profesor.Telefono}</span>
                        <div className="text-2xl font-bold">{profesor.Correo}</div>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={profesor.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (profesor) => {
        return (
            <div className="col-4 sm:col-6 lg:col-12 xl:col-4 p-2" style={{width:'100% !important'}}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-bookmark-fill"></i>
                            <span className="" style={{width:'100% !important'}}>{profesor.MNombre}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">

                        {profesor.Foto && <img className="" alt="Selected image" src={profesor.Foto}
                        style={{ borderRadius: "10%", width:'80% ' }} />}
                        <div className="text-2xl font-bold" style={{width:'100%'}}>{profesor.Nombre}</div>
                        <div className="text-2xl font-bold" style={{width:'100%'}}>{profesor.Descripcion}</div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <span className="text-2xl font-semibold" style={{width:'100%'}}>{'Tel: '+profesor.Telefono}</span>
                        <span className="text-2xl font-semibold" style={{width:'100%'}}>{'Correo: '+profesor.Correo}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={profesor.inventoryStatus === 'OUTOFSTOCK'} onClick={() => console.log("PROFESORES ", profesor)}></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (profesor, layout) => {

        if (!profesor) {
            return;
        }

        if (layout === 'list') return listItem(profesor);
        else if (layout === 'grid') return gridItem(profesor);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
            <div className="card">
            
            {render && <DataView value={profesor} itemTemplate={itemTemplate} lazy paginator rows={6} layout={layout} header={header()} />} 
            </div>
    )
}