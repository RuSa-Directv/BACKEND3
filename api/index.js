const { Router } = require('express');
const router = Router();

const { getUsers,createCert, getSearch, getPais, createUser} = require('./controllers');

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

module.exports = router;