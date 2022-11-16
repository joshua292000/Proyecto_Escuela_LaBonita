import ReactPDF, { Page, Text, View, Document, StyleSheet,PDFViewer,PDFDownloadLink,Font,Image } from '@react-pdf/renderer';
import Escudo_escuela from '../Recursos/Escudo_escuela.png';
import logo_mep from '../Recursos/logo_mep.png';
import{getCurrentDate} from '../Utils/ObtenerFechaActual'
import{ConvertirFechaATexto} from '../Utils/ObtenerFechaActual'
import { Obtener_Persona_Rol } from "../Persistencia/FuncionarioService";
import React, { useRef, useState, useEffect } from 'react';


 

Font.registerHyphenationCallback(word => {
    const middle = Math.floor(word.length / 2);
    const parts = word.length === 1 ? [word] : [word.substr(0, middle), word.substr(middle)];
   
    return parts;
  });

const ConstanciaPDF = (props) =>{

    const [funcionario, setFuncionario] = useState([]);
   

    useEffect(() => {
      const ObtenerDatosFuncionario = async ()=>{
        const res = await Obtener_Persona_Rol()
        setFuncionario(res)
      }
      ObtenerDatosFuncionario();
},[]);

    return(
        <Document>
        <Page size="A4" style={styles.body}>
            
            <Image
              style={styles.image}
              src={logo_mep}
            />
            <Image
              style={styles.image2}
              src={Escudo_escuela}
            />
            
            
            <Text style={styles.header}>Email:esc.rodrigofaciobrenes@mep.go.cr</Text>
            <Text style={styles.header}>TELEFAX: 2770-1253</Text>
            <Text style={styles.header}>ESCUELA RODRIGO FACIO BRENES-CIRCUITO 01</Text>
            <Text style={styles.header}>DIRECCIÓN REGIONAL DE EDUCACIÓN PÉREZ ZELEDÓN</Text>
            <Text style={styles.header}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>
  
            <Text style={styles.title}>CONSTANCIA TRASLADO  </Text>
            <Text style={styles.title2}>OFICIO DREPZ-ERFB-C01-CT019-2022 </Text>
           
   
            <Text style={styles.text}>
              La suscrita, en calidad de directora del Centro Educativo Rodrigo
              Facio Brenes, código 0953 del circuito 01 de la Dirección Regional de
              Enseñanza de Pérez Zeledón, hago constar que el niño {props.estudiante ?props.estudiante[0].PNombre +" "+ props.estudiante[0].SNombre +" "+ props.estudiante[0].PApellido +" "+ props.estudiante[0].SApellido : "..."} 
              , cédula Nº {props.estudiante ?props.estudiante[0].Identificacion : "..."} se encuentra
              matriculado en el CICLO ESCOLAR de la Educación Escolar,
              según consta en registros administrativos para el curso lectivo {getCurrentDate()}.
            </Text>
  
           
            
  
            <Text style={styles.text}>  
              Se solicita el traslado para el centro educativo: {window.myGlobalEscuela} , Dirección Regional de { window.myGlobalRegional}, Circuito {window.myGlobalCircuito}.
            </Text>
  
            <Text style={styles.text}>
              Se extiende la presente en La Bonita de Pérez Zeledón a los {ConvertirFechaATexto()}.
            </Text>
  
           <View style={{ color: 'black', textAlign: 'center', margin: 10,fontFamily:'Times-Roman',fontSize:12}}>
              <Text>MSc. {funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})} </Text>
              <Text>Directora  </Text>
              <Text>Escuela Rodrigo Facio Brenes. </Text>
            </View>
        </Page>
      </Document>
    );
}

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 110,
    },
    title: {
      paddingTop: 10,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      marginTop:80,
    },
    title2: {
      paddingTop: 5,
      fontSize: 14,
      textAlign: 'center',
      fontFamily: 'Times-Roman',
      marginTop:5,
    },
    text: {
      margin: 12,
      textAlign: 'justify',
      fontFamily:'Times-Roman',
      fontSize:12
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 400,
      marginLeft:-90,
      marginTop:-10,
      
  
    },
    image2: {
      marginVertical: 15,
      marginHorizontal: -70,
      marginLeft:380,
      marginTop:-75,
     
    },
    header: {
      fontSize: 10,
      marginBottom: 2,
      textAlign: 'center',
      color: 'grey',
      marginTop:-25,
    }
    });

    export default ConstanciaPDF;