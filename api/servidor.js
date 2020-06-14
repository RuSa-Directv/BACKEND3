const express = require("express");//importo la libreria express
const app = express();//hago mi variable ejecutando el express



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//rutas
app.use(require('./index'));


app.listen(2999);
console.log('Server on port 2999');

// app.get("/", inicio);
// app.get("/cursos", cursos);
// app.get("/metal", metal);

// function inicio(peticion, resultado)
// {
//     resultado.send("este es el HOME");
// }

// function cursos(peticion, resultado)
// {
//     resultado.send("esto son los cursos");
// }
// function metal(peticion, resultado)
// {
//     resultado.send("metales");
// }


