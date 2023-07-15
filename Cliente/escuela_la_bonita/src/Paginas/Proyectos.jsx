import React from "react";
import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import gimnasio from "../Recursos/gim1.jpg"
import donar from "../Recursos/donar.jpg"
import huerta from "../Recursos/huerta.png"

export function Proyectos() {
  return (
    <div>
      {" "}
      <Header />
      <div>
        <div class="container py-5">
          <div class="main-timeline-2">
            <div class="timeline-2 left-2">
              <div class="card">
                <img
                  src={huerta}
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Huerta Escolar</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2018
                  </p>
                  <p class="mb-0">
                    Proyecto de huerta escolar, donde participan los estudiantes.
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 right-2">
              <div class="card">
                <img
                  src={gimnasio}
                  style={{height:"250px"}}
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Construcción del Gimnasio</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2023
                  </p>
                  <p class="mb-0">
                  Imagen con fines ilustrativos.
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 left-2">
              <div class="card">
                <img
                  src={donar}
                  style={{height:"250px"}}
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Donaciones</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> Puedes donar a la siguiente cuenta bancaria:
                  </p>
                  <p class="mb-0">
                  1-1-1-1-1-1-1-1-1-1-1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
