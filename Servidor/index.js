const express = require("express");
//const session = require("express-session");
const app = express();

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var cors = require('cors')

app.use(cors())
/*
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}))

app.get('/',(req, res)=>{
    req.session.usuario = 'JULIAN';
    req.session.vistas = req.session.vistas ? ++req.session.vistas : 1;

    res.send(`El usuario <strong>${req.sesion.usuario}</strong> 
    ha visitado esta pagina <strong>${req.sesion.vistas}</strong> veces`
           );

})*/
//cargamos el archivo de rutas
app.use(require('./services/encargadoEstuService'));
app.use(require('./services/estudianteSevice'));
app.use(require('./services/personaService'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3000");
});
module.exports = app;
