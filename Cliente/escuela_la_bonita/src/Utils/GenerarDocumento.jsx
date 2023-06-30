import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import axios from 'axios';

export const generarDocumento = async (plantilla, datos, nombreSalida) =>{
    try{
        const response = await axios.get('/plantilla/' + plantilla, { responseType: 'arraybuffer' });
        const content = response.data;
        const zip = new PizZip(content);
          const doc = new Docxtemplater().loadZip(zip);
          console.log("datos en la funcion lleva : ", datos);
          
          doc.setData(datos);
          
          try {
            doc.render();
            const generatedDocument = doc.getZip().generate({
                type: "blob",
                mimeType:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              });
            saveAs(generatedDocument, nombreSalida + '.docx');
          } catch (error) {
            // Manejo de errores
            console.log(error);
          } finally{
            return false;
          }

    }catch(err){
        console.log(err);
    }

}
