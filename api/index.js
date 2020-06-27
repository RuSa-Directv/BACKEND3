const { Router } = require('express');
const router = Router();

const { getUsers,createCert, getSearch, getPais, createUser,auth,getUser,
createVel,upVel,delVel,getApp, createApp, upApp, delApp,
getPrd,createPrd,upPrd, delPrd, getSrv, createSrv, upSrv, delSrv, getDetSrv, createDetSrv,
getDetApp,createDetApp,
getPai, createPais, upPais, delPais,getPa,getCert,upCert, delCert } = require('./controllers');

// test



//buscadores
    //search
router.get('/search/:id',getSearch );
//detalles
router.get('/det_serv/',getDetSrv);
router.post('/adddetsrv',createDetSrv);


router.get('/det_app/',getDetApp);
router.post('/adddetapp',createDetApp);

    //pais
router.get('/paises/:id',getPais);
router.get('/pais',getPai);
router.get('/pai/',getPa);
router.post('/addpais',createPais)
router.post('/uppais',upPais);
router.post('/delpais',delPais)

//servicios
router.get('/srv',getSrv );
router.post('/addsrv',createSrv);
router.post('/upsrv',upSrv);
router.post('/delsrv',delSrv);

//productos
router.get('/prd',getPrd );
router.post('/addprd',createPrd);
router.post('/upprd',upPrd);
router.post('/delprd',delPrd);

//aplicaciones
router.get('/app',getApp );
router.post('/addapp',createApp);
router.post('/upapp',upApp);
router.post('/delapp',delApp);


    //certificados
router.get('/cert',getCert );
router.post('/upcert',upCert);
router.post('/delcert',delCert);
router.post('/cert',createCert);

    //usuarios
router.get('/user',getUser );	
router.post('/adduser',createUser);
	//veladores
router.get('/users',getUsers );
router.post('/addvel',createVel);
router.post('/upvel',upVel);
router.post('/delvel',delVel);




//Login
router.post('/auth',auth);

module.exports = router;