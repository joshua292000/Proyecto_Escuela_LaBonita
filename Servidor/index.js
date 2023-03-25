const express = require("express");
//const session = require("express-session");
const app = express();

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var cors = require('cors')
app.use(cors())

//cargamos el archivo de rutas
app.use(require('./services/encargadoEstuService'));
app.use(require('./services/estudianteSevice'));
app.use(require('./services/personaService'));
app.use(require('./services/funcionarioService'));
app.use(require('./services/viajaConService'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3000");
});
module.exports = app;
