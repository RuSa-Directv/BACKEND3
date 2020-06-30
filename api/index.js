const { Router } = require('express');
const router = Router();



const { getUsers,createCert, getSearch, getPais, createUser,auth,getUser,
createVel,upVel,delVel,getApp, createApp, upApp, delApp,
getPrd,createPrd,upPrd, delPrd, getSrv, createSrv, upSrv, delSrv, getDetSrv, createDetSrv, upDetSrv,delDetSrv,
getDetApp,createDetApp,upDetApp,delDetApp, Login, Logina, Logine, priv,
getPai, createPais, upPais, delPais,getPa,getCert,upCert, delCert } = require('./controllers');

// test



//login



router.post('/auth',auth);


router.post('/login',priv,Login);
router.post('/logina',Logina);
router.get('/logine',Logine);









//buscadores
    //search
router.get('/search/:id',getSearch );
//detalles
router.get('/det_serv/',getDetSrv);
router.post('/adddetsrv',createDetSrv);
router.post('/updetsrv',upDetSrv);
router.post('/deldetsrv',delDetSrv);


router.get('/det_app/',getDetApp);
router.post('/adddetapp',createDetApp);
router.post('/updetapp',upDetApp);
router.post('/deldetapp',delDetApp);





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
router.post('/upcert',priv,upCert);
router.post('/delcert',priv,delCert);
router.post('/cert',priv,createCert);

    //usuarios
router.get('/user',getUser );	
router.post('/adduser',createUser);
	//veladores
router.get('/users',getUsers );
router.post('/addvel',priv,createVel);
router.post('/upvel',priv,upVel);
router.post('/delvel',priv,delVel);






module.exports = router;