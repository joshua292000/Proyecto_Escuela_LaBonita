
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { ObtenerFunMostrar, ObtenerImgFunc } from "../Persistencia/FuncionarioService";
import axios from 'axios';

export function DataViewDemo() {
    const [profesor, setProfesor] = useState();
    const [render, setRender] = useState(false);
    useEffect(() => {
        const obtenerFun = async () => {
            const data = await ObtenerFunMostrar();
            if (data !== null) {
                await obtenerImg(data);
            } else {
                //va el error del servidor
            }
        }
        obtenerFun();

    }, []);


    const obtenerImg = async (datos) => {
        let usuarioActualizado = {};
        let usuarios = [];
        for (let i = 0; i < datos.length; i++) {
            console.log("Cedula " + datos[i].cedula);
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
    }
    const responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const productTemplate = (profesor) => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3" style={{ width: '100%' }}>
                <Tag className="mr-2" icon="pi pi-book" severity="success" value={profesor.MNombre} style={{ margin: '10px' }}></Tag>
                <div className="mb-3">
                    {profesor.Foto && <img src={profesor.Foto} alt="Foto" className="w-6 shadow-2" />}
                </div>
                <div>
                    <h4 className="mb-1">{profesor.Nombre}</h4>
                    <h6 className="mt-0 mb-3">{profesor.Descripcion}</h6>
                    <div className="mt-5 ">
                        <Button icon="pi pi-whatsapp" className="p-button-success p-button-rounded" />
                        <h6 className="mt-0 mb-3">{profesor.Telefono}</h6>
                        <Button icon="pi pi-envelope" className="p-button p-button-rounded" />
                        <h6 className="mt-0 mb-3">{profesor.Correo}</h6>
                    </div>
                </div>
            </div>
        );
    };
    const productTemplate2 = (profesor) => {
        return (
            <div className='border-1 surface-border border-round m-2 text-center py-5 px-3'>
                <div className="container ">
                    <div className='row justify-content-md-center'>
                        <div className="col-sm">
                            {profesor.Foto && <img src={profesor.Foto} alt="Foto" className="w-6 shadow-2" />}
                        </div>
                    </div>
                    <Tag className="mr-2" icon="pi pi-book" severity="success" value={profesor.MNombre} style={{ margin: '10px' }}></Tag>

                    <div className='row'>
                        <h4 className="mb-1">{profesor.Nombre}</h4>
                    </div>
                    <div className='row'>
                        <h6 className="mt-0 mb-3">{profesor.Descripcion}</h6>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-auto'>
                            <Button icon="pi pi-whatsapp" className="p-button-success p-button-rounded" />
                        </div>
                        <div className='col-md-auto' style={{ display: 'flex', alignItems: 'end' }}>
                            <h6 className="mt-0 mb-3" >{profesor.Telefono}</h6>
                        </div>
                    </div>
                    <div className='row justify-content-center'>
                        <div className='col-md-auto'>
                            <Button icon="pi pi-envelope" className="p-button p-button-rounded" />
                        </div>
                        <div className='col-md-auto' style={{ display: 'flex', alignItems: 'end' }}>
                            <h6 className="mt-0 mb-3" style={{ overflowWrap: 'anywhere' }}>{profesor.Correo}</h6>
                        </div>
                    </div>
                </div>
            </div>

        );
    };
    return (

        <div className="card">
            {render && <Carousel value={profesor} numVisible={2} numScroll={1} responsiveOptions={responsiveOptions} circular
                autoplayInterval={3000} itemTemplate={productTemplate2} />}
        </div>
    )
}
