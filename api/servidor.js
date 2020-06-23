const express = require("express");//importo la libreria express
const app = express();//hago mi variable ejecutando el express




//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


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


