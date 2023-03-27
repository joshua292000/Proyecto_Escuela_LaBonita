import React from "react";
import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";


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
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(135).webp"
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Proyecto #1</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2022
                  </p>
                  <p class="mb-0">
                    Proyecto #1.
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 right-2">
              <div class="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(129).webp"
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Proyecto #2</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2021
                  </p>
                  <p class="mb-0">
                  Proyecto #2.
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 left-2">
              <div class="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(131).webp"
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Proyecto #3</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2020
                  </p>
                  <p class="mb-0">
                  Proyecto #3.
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 right-2">
              <div class="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(125).webp"
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4"> Proyecto #4</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2019
                  </p>
                  <p class="mb-0">
                  Proyecto #4
                  </p>
                </div>
              </div>
            </div>
            <div class="timeline-2 left-2">
              <div class="card">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(144).webp"
                  class="card-img-top"
                  alt="Responsive image"
                />
                <div class="card-body p-4">
                  <h4 class="fw-bold mb-4">Proyecto #5</h4>
                  <p class="text-muted mb-4">
                    <i class="far fa-clock" aria-hidden="true"></i> 2018
                  </p>
                  <p class="mb-0">
                  Proyecto #5.
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
