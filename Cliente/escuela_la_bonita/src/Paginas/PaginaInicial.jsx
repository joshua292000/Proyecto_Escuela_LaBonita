

//import Header from "../Componentes/Cabecera";

import Footer from "../Componentes/Pie";

import Home from "../Componentes/Home";

import { Header } from "../Componentes/Cabecera";

function PaginaInicial() {
  window.myGlobalLoggin = false;
  return (
    <>
      <div>
      <Header/>
      <Home />
      <Footer />
     </div>
    </>
 
  );
}

export default PaginaInicial;