import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
  Image,
 
  
} from "@react-pdf/renderer";
import Escudo_escuela from "../Recursos/Escudo_escuela.png";
import logo_mep from "../Recursos/logo_mep.png";
import { getCurrentDate } from "../Utils/ObtenerFechaActual";
import { ConvertirFechaATexto } from "../Utils/ObtenerFechaActual";
import { Obtener_Persona_Rol } from "../Persistencia/FuncionarioService";
import React, { useRef, useState, useEffect } from "react";
//import { Table } from "@material-ui/core";
import {Table,TableHeader,TableCell,TableBody,DataTableCell} from "@david.kucsai/react-pdf-table"

Font.registerHyphenationCallback((word) => {
  const middle = Math.floor(word.length / 2);
  const parts =
    word.length === 1 ? [word] : [word.substr(0, middle), word.substr(middle)];

  return parts;
});

const ReportePDF = (props) => {
  
    const [funcionario, setFuncionario] = useState([]);
   

    useEffect(() => {
      const ObtenerDatosFuncionario = async ()=>{
        const res = await Obtener_Persona_Rol()
        setFuncionario(res)
      }
      ObtenerDatosFuncionario();
},[]);

console.log("global", props.dato)
    

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image style={styles.image} src={logo_mep} />
        <Image style={styles.image2} src={Escudo_escuela} />

        <Text style={styles.header}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>

        <Text style={styles.header}>
          DIRECCIÓN REGIONAL DE EDUCACIÓN PÉREZ ZELEDÓN
        </Text>

        <Text style={styles.header}>
          ESCUELA RODRIGO FACIO BRENES-CIRCUITO 01
        </Text>

        <Text style={styles.header}>TELEFAX: 2770-1253</Text>

        <Text style={styles.header}>
          Email:esc.rodrigofaciobrenes@mep.go.cr
        </Text>
      

        <Text style={styles.title}>REPORTE DE ASISTENCIA </Text>
        <Text style={styles.title2}>OFICIO DREPZ-ERFB-C01-CT019-2022 </Text>

        <Text style={styles.text}>
          Se detallan la asistencia del grupo de {window.myGlobalSeccion} .
        </Text>

        
        <Table
          data={props.dato} 
          style={styles.Tabla}
        >
     
            <TableHeader  style={styles.Tabla}>
                    <TableCell style={styles.Tabla} >
                        Identificacion
                    </TableCell>
                    <TableCell style={styles.Tabla}>
                        Nombre Completo
                    </TableCell>
                    <TableCell style={styles.Tabla}>
                        Asistencia
                    </TableCell>
                    <TableCell style={styles.Tabla}>
                        Aus. Justificada
                    </TableCell>
                    <TableCell style={styles.Tabla}>
                        Aus. Injustificada
                    </TableCell>
                </TableHeader>
               
                <TableBody>
                     <DataTableCell getContent={(r) => r.Identificacion} style={styles.Tabla}/>
                     <DataTableCell getContent={(r) => r.PNombre+" "+r.SNombre+" "+r.PApellido+" "+r.SApellido} style={styles.Tabla}/>
                     <DataTableCell getContent={(r) => r.Asistencia} style={styles.Tabla}/>
                     <DataTableCell getContent={(r) => r.Ausencia} style={styles.Tabla}/>
                     <DataTableCell getContent={(r) => r.Ausencia_Justificada} style={styles.Tabla}/>
                </TableBody>
                
            </Table>
        
       
        <Text style={styles.text2}>
          Se extiende la presente en La Bonita de Pérez Zeledón a los{" "}
          {ConvertirFechaATexto()}.
        </Text>

        <View
          style={{
            color: "black",
            textAlign: "center",
            margin: 10,
            fontFamily: "Times-Roman",
            fontSize: 12,
          }}
        >
          <Text>MSc. {funcionario.map((func)=>{return func.PNombre +' '+func.SNombre+' '+func.PApellido+' '+func.SApellido})} </Text>
          <Text>Escuela Rodrigo Facio Brenes. </Text>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
    transform: "translateY(-130px)",
  },
  title2: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
    transform: "translateY(-120px)",
  },
  text: {
    transform: "translateY(-50px)",
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontSize: 12,
  },
  text2: {
    marginTop: 40,
    textAlign: "justify",
    fontFamily: "Times-Roman", 
    fontSize: 12,
  },
  image: {
   width: "22%",
   transform: "translateX(-10px) translateY(-10px)",
  
  },
  image2: {
    width: "20%",
    transform: "translateX(420px) translateY(-82px)",
    
  },
  header: {
    fontSize: 10,
    textAlign: "center",
    color: "grey",
    transform: "translateY(-160px)",
  },
  Tabla: {
    fontSize: 12,
    textAlign: "center",
    color: "black",
    
  },
});

export default ReportePDF;
