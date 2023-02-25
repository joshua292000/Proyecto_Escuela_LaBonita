import "../style.css";
import "../Estilos.css";
import { Header } from "../Componentes/Cabecera";



export function AcercaDe() {
  return (
    <div>
    {" "}
    <Header />
    <div>
        <div >
                <h2 style={{textAlign: 'center', justifyContent: 'center'}} id="Historia">Historia</h2>
                
                <p style={{textAlign: 'center', justifyContent: 'center', marginLeft:'150px', marginRight:'150px', fontFamily: 'Helvetica'}}>
                <b>
                La historia se remonta varios años atrás, cuando esta institución no existía, los niños y niñas 
                tenían que ir hasta Miravalles, luego el señor José Joaquín Peralta, con la ayuda de algunos vecinos, 
                construyeron un rancho en su finca, donde empezaron a dar lecciones, la primera maestra que llego fue 
                María Elena Valverde de Borge y luego Marita González, varios años después fue donado un lote para que 
                se construyera la escuela, este pertenecía a José Joaquín Peralta, pero se tuvo mala suerte y el murió 
                antes de traspasar la escritura a la institución.  
                Según lo relatado, por la primera docente y directora de la escuela Rodrigo Facio Brenes, María  
                Elena  Valverde  Chinchilla, según dice: en 1962 me trasladé a la comunidad de La Bonita, pueblo 
                cercano al centro de San Isidro, era la primera vez que había escuela en ese lugar, fue una 
                experiencia enriquecedora para mi carrera profesional, realizar los trámites de apertura de una 
                escuela era engorroso, todo el papeleo que los vecinos habían realizado los tuve que volver a 
                presentar, censo escolar por edades, escolaridad y grados que se iban a impartir, censo de 
                población, número de familias con niños en edad escolar y residencia fija, medios económicos 
                de la familias, entre otras, lo deprimente no era el trabajo, era la carencia de un lugar donde
                impartir las lecciones, de muebles y enseres escolares. 
                </b>
                </p>       
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div >
            <div id="Mision">
                    <h2 style={{textAlign: 'center', justifyContent: 'center'}} >Misión</h2>
                    
                    <p style={{textAlign: 'center', justifyContent: 'center', marginLeft:'150px', marginRight:'150px', fontFamily: 'Helvetica'}}>
                    <b>
                    Somos una institución educativa formadora de personas con habilidades y destrezas 
                    para su desarrollo integral.
                    </b>
                    </p>       
            </div>
            <br></br>
            <div >
                    <h2 style={{textAlign: 'center', justifyContent: 'center'}} id="Vision">Visión</h2>
                    
                    <p style={{textAlign: 'center', justifyContent: 'center', marginLeft:'150px', marginRight:'150px', fontFamily: 'Helvetica'}}>
                    <b>
                    Ser una institución de calidad, comprometida en el desarrollo integral de la comunidad estudiantil.
                    </b>
                    </p>       
            </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div >
                <h2 style={{textAlign: 'center', justifyContent: 'center'}} id="Junta">Junta Directiva</h2>
                
                <p style={{textAlign: 'center', justifyContent: 'center', marginLeft:'150px', marginRight:'150px', fontFamily: 'Helvetica'}}>
                <b>
                    Somos un grupo de personas que perseguimos el mismo fin, mejorar la escuela de nuestros hijos e hijas.
                    Para poder trabajar de forma eficaz y para lograr que todos se puedan integrar y sentirse parte
                    del grupo, distribuyendo mutuamente las responsabilidades.
                </b>
                </p>       
        </div>
      
    </div>
    </div>
  );
}
