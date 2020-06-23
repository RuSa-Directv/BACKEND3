const { Router } = require('express');
const router = Router();

const { getUsers,createCert, getSearch, getPais, createUser,auth} = require('./controllers');

// test
router.get('/users',getUsers );

//buscadores
    //search
router.get('/search/:id',getSearch );
    //pais
router.get('/paises/:id',getPais);



//subida
    //certificados
router.post('/cert',createCert);
    //usuarios
router.post('/adduser',createUser);


//Login
router.post('/auth',auth);

module.exports = router;