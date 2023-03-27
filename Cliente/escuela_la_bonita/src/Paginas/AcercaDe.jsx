import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";
import Facio from "../Recursos/Facio.jpg";
import MV from "../Recursos/MV2.png";
import JD from "../Recursos/JD.png";

export function AcercaDe() {
  return (
    <div>
      {" "}
      <Header />
      <div>
        <div>
          <h2 style={{ marginLeft: "20px" }} id="Historia">
            Historia
          </h2>
          <div class="noticia">
            <img
              class="derecha"
              src={Facio}
              alt="Rodrigo Facio Brenes"
              width="200px"
            />
            <aside>
              {" "}
              La historia se remonta varios años atrás, cuando esta institución
              no existía, los niños y niñas tenían que ir hasta Miravalles,
              luego el señor José Joaquín Peralta, con la ayuda de algunos
              vecinos, construyeron un rancho en su finca, donde empezaron a dar
              lecciones, la primera maestra que llego fue María Elena Valverde y
              luego Marita González, varios años después fue donado un lote para
              que se construyera la escuela, este pertenecía a José Joaquín
              Peralta, pero se tuvo mala suerte y el murió antes de traspasar la
              escritura a la institución. María Elena Valverde y la comunidad se
              organizaron y con la ayuda del Patronato escolar y la Junta de
              Educación, realizaron actividades extra-lectivas y reunieron el
              dinero que se necesitaba para la construcción de la escuela, se
              solicitó ayuda de materiales al Ministerio de transportes y se
              logró construir un aula con los menajes básicos de funcionamiento.
              Don Manuel Páez, administrador de la finca, propulsor de la
              apertura de la escuela, a este señor se debe que la escuela lleve
              el nombre de Rodrigo Facio Brenes, el propuso este nombre y fue
              aceptado por el pueblo y por el Ministerio de Educación pública,
              Don Rodrigo Facio Brenes había sido una persona de mucho prestigio
              como abogado, profesor universitario y luego como rector de la
              UCR, Don Manuel había trabajado en la UCR, en un puesto
              administrativo y había admirado a don Rodrigo por su calidad
              humana y don de gentes, así como profesional.
            </aside>
            <div class="reset"></div>
          </div>
        </div>

        <div class="noticia">
          <img class="izquierda" src={MV} alt="MisionVision" width="400px" />
          <h2 style={{ textAlign: "right", marginRight: "20px" }} id="Mision">
            Misión
          </h2>
          <aside style={{ textAlign: "right", marginRight: "20px" }}>
            Somos una institución educativa formadora de personas con
            habilidades y destrezas para su desarrollo integral.
          </aside>
          <br></br>
          <h2 style={{ textAlign: "right", marginRight: "20px" }} id="Vision">
            Visión
          </h2>
          <aside style={{ textAlign: "right", marginRight: "20px" }}>
            {" "}
            Ser una institución de calidad, comprometida en el desarrollo
            integral de la comunidad estudiantil.
          </aside>
          <div class="reset"></div>
        </div>

        <div class="noticia">
          <img
            class="derecha"
            src={JD}
            alt="JuntaDirectiva"
            width="350px"
            style={{ marginTop: "-130px" }}
          />
          <h2 id="Junta">Junta Directiva</h2>
          <aside>
            {" "}
            Somos un grupo de personas que perseguimos el mismo fin, mejorar la
            escuela de nuestros hijos e hijas. Para poder trabajar de forma
            eficaz y para lograr que todos se puedan integrar y sentirse parte
            del grupo, distribuyendo mutuamente las responsabilidades.
          </aside>
          <div class="reset"></div>
        </div>
      </div>
    </div>
  );
}
