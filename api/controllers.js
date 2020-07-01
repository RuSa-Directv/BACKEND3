const {Pool}= require('pg');

const jwt = require('jsonwebtoken');

function createToken (user) {
  return jwt.sign({user},'miclaveultrasecreta123*',{expiresIn: 180});
};


function priv(req,res,next){
	if (!req.headers['token'])
	{
		console.log("no logueado");
		return res.status(403).json({ mensaje: 'No Logueado' })
		//.send('Sin Token');
		//.redirect('/login');
	}
	else{
	//console.log("1");
	const token = req.headers['token'];
	//console.log(token);
	jwt.verify(token, 'miclaveultrasecreta123*', (err, decoded) => {
    if(err) 
	{
		console.log("token Incorrecto");
		return res.status(666).json({ mensaje: 'Token Invalido' });
		  //.redirect('/login');
    }
	else{
	//res.json({ mensaje: "token ok"})
	console.log("token ok");
    next(); // payload verificado, prosigue ;)
	}
	
	  });

	}

};







const pool = new Pool({
    host:'dbgit2',
    user: 'rusa',
    password: 'rusa',
    database: 'rusa_db',
    port: '5432'
});


const Login = async (req,res)=>{
	console.log(req.body);
	res.send('Inicio');
	
};




const Logina = async (req,res,next)=>{
	const{ usuario, pass}=req.body;
	const response = await pool.query('SELECT usuario, pass FROM usuarios WHERE usuario = $1 AND pass = $2', [usuario, pass]);
	if(response.rows == false)
	{	
		res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"});
		//res.send('false');
		
	}
	else
	{
	const payload = {check:  true};
	const token = createToken(req.body.usuario)
	  //res.json({mensaje: 'Autenticación correcta',token: token});
    res.status(200).json({token : token});
	//res.send('true');
	
	}

};


const Logine =  async (req, res, next) =>{
	if (!req.headers['token'])
	{
		console.log("no logueado");
		return res.status(403).json({ mensaje: 'No Logueado' });
		//.redirect('/login');
	}
	else{
	console.log("1");
	const token = req.headers['token'];
	console.log(token);
	jwt.verify(token, 'miclaveultrasecreta123*', (err, decoded) => {
    if(err) 
	{
		console.log("token Incorrecyo");
		return res.status(403).json({ mensaje: 'Token Invalido' });
		  //.redirect('/login');
    }
	else{
	res.json({ mensaje: "token ok"})
	console.log("token ok");
    //next(); // payload verificado, prosigue ;)
	}
	
	  });

	}
};








const auth = async (req,res)=>{
	console.log(req.body);
    const{ usuario, pass}=req.body;
	const response = await pool.query('SELECT usuario, pass FROM usuarios WHERE usuario = $1 AND pass = $2', [usuario, pass]);

	console.log(response.rows)
	if(response.rows == false){

		
		res.status(401).json({estado: 'false'});
		
	}
	else{

    res.status(200).json(response.rows);
	//res.send('true');
	}


};


const pass = async (req,res)=>{
    const{ usuario, pass, passold}=req.body;
	const response1 = await pool.query('SELECT usuario, pass FROM usuarios WHERE usuario = $1 AND pass = $2', [usuario, passold]);
	if(response1.rows == false)
	{
			res.status(444).send('false');
	}
	else
	{
		const response = await pool.query('UPDATE usuarios SET pass = $2 WHERE usuario = $1', [usuario, pass]);
		if(response.rowCount === 0)
		{
			res.status(444).send('false');
		}
		else
		{
			res.status(200).send('true');
		}
	}

};



const getUser =  async (req, res) =>{
    const response = await pool.query('SELECT usuario, pass, nombre, email FROM usuarios order by id_user');
    //res.status(200).json(response.rows); 
};


const getSearch =  async (req, res) =>{
    like = "%" + req.params.id.toLowerCase() + "%";
    const response = await pool.query('SELECT P.n_paises AS "Pais" ,PR.n_productos AS "pro",S.n_servicios AS "ser",A.n_aplicaciones AS "app", V.persona AS "du", V.telefono AS "tel", E1.persona as "es1", E1.telefono as "tel1",E2.persona as "es2", E2.telefono as "tel2", E3.persona as "es3",E3.telefono as "tel3"'+ 
            ' from (servicios S inner join det_serv DS on S.id_servicios = DS.id_serv) inner join'+
            ' paises P on P.id_paises = DS.id_pai inner join'+
            ' productos PR on PR.id_productos = DS.id_prod inner join'+
            ' aplicaciones A on A.id_aplicaciones = DS.id_aplica inner join'+ 
            ' det_aplicaciones DA on A.id_aplicaciones = DA.id_aplica inner join'+
            ' veladores V on V.id_veladores = DA.resp inner join veladores E1 on E1.id_veladores = DA.esc_1 inner join veladores E2 on E2.id_veladores = DA.esc_2 inner join veladores E3 on E3.id_veladores = DA.esc_3'+			
            ' where lower(A.n_aplicaciones ) like $1 or lower(S.n_servicios ) like $1 or lower(V.persona ) like $1 or lower(PR.n_productos ) like $1 '+
            ' order by A.n_aplicaciones, pr.n_productos ',[like]);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json(response.rows);
};






//creacion-----------------------------------------------------------------------------------------------


const createUser = async (req,res)=>{
    const{ usuario, pass, nombre, email}=req.body;
	console.log(req.body);
	await pool.query('INSERT INTO usuarios (usuario, pass, nombre, email) VALUES ($1,$2,$3,$4)', [usuario, pass, nombre, email]);
    res.send('creado');
};

//detalles de servicio--------------------------------------------------------------------------
const getDetSrv =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM det_serv order by id_serv');
    res.status(200).json(response.rows); 
};

const createDetSrv = async (req,res)=>{
    const{ id_serv, id_prod, id_pai, id_aplica, ponderacion}=req.body;
   await pool.query('INSERT INTO det_serv (id_serv, id_prod, id_pai, id_aplica, ponderacion) VALUES ($1,$2,$3,$4,$5)', [id_serv, id_prod, id_pai, id_aplica, ponderacion]);
    console.log(req.body);
    res.send('creado');

};


const upDetSrv = async (req,res)=>{
    const{ id_serv, id_prod, id_pai, id_aplica, id, ponderacion}=req.body;
	console.log(req.body);
	await pool.query('UPDATE det_serv SET id_serv = $1 , id_prod = $2 , id_pai = $3 , id_aplica = $4 , ponderacion = $6 WHERE id = $5', [id_serv, id_prod, id_pai, id_aplica, id, ponderacion]);
	res.send('Actualizado');

};

const delDetSrv = async (req,res)=>{
    const{id}=req.body;
	await pool.query('DELETE FROM det_serv WHERE id = $1', [id]);
    console.log(req.body);
    res.send('Actualizado');

};




//Fin detalles de servicio -------------------------------------------------------------------------------------

//detalles de aplicacione--------------------------------------------------------------------------


const getDetApp =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM det_aplicaciones order by id_aplica');
    res.status(200).json(response.rows); 
};

const createDetApp = async (req,res)=>{
    const{ id_aplica, resp, esc_1, esc_2,esc_3}=req.body;
   await pool.query('INSERT INTO det_aplicaciones (id_aplica, resp, esc_1, esc_2,esc_3) VALUES ($1,$2,$3,$4,$5)', [id_aplica, resp, esc_1, esc_2,esc_3]);
    console.log(req.body);
    res.send('creado');
};


const upDetApp = async (req,res)=>{
    const{ id_aplica, resp, esc_1, esc_2,esc_3, id}=req.body;
	console.log(req.body);
	await pool.query('UPDATE det_aplicaciones SET id_aplica = $1 , resp = $2 , esc_1 = $3 , esc_2 = $4,esc_3 = $5  WHERE id = $6', [id_aplica, resp, esc_1, esc_2,esc_3, id]);
	res.send('Actualizado');

};

const delDetApp = async (req,res)=>{
    const{id}=req.body;
	await pool.query('DELETE FROM det_aplicaciones WHERE id = $1', [id]);
    console.log(req.body);
    res.send('Actualizado');

};










//Fin detalles de applicaciones -------------------------------------------------------------------------------------

//Certificados-------------------------------------------------------------------------------------


const getCert =  async (req, res) =>{
	const fecha = "DD/MM/YYYY";
    const response = await pool.query('SELECT id, nombre , pais ,emisor ,reponsable ,telefono, to_char(vencimiento, $1) as vencimiento FROM certificados order by id', [fecha]);
    res.status(200).json(response.rows); 
};

const createCert = async (req,res)=>{
	console.log(req.body);
    const{ nombre, pais, emisor, reponsable,telefono, vencimiento}=req.body;
   await pool.query('INSERT INTO certificados (nombre, pais, emisor, reponsable,telefono, vencimiento) VALUES ($1,$2,$3,$4,$5,$6)', [nombre, pais, emisor, reponsable,telefono, vencimiento]);

    res.send('creado');

};


const upCert = async (req,res)=>{
    const{ nombre, pais, emisor, reponsable,telefono, vencimiento, id}=req.body;
	console.log(req.body);
	await pool.query('UPDATE certificados SET nombre = $1 , pais = $2 , emisor = $3 , reponsable = $4 , telefono = $5 , vencimiento = $6 WHERE id = $7', [nombre, pais, emisor, reponsable,telefono, vencimiento, id]);
	res.send('Actualizado');

};

const delCert = async (req,res)=>{
    const{id}=req.body;
	await pool.query('DELETE FROM certificados WHERE id = $1', [id]);
    console.log(req.body);
    res.send('Actualizado');

};

//Fin Certificados-------------------------------------------------------------------------------------






//Paises-------------------------------------------------------------------------------------

//-------------consultas------------------------------------
const getPais =  async (req,res) =>{
    pais = req.params.id.toLowerCase();
    const response = await pool.query('SELECT PR.n_productos AS "pro",S.n_servicios AS "ser",A.n_aplicaciones AS "app", V.persona AS "du", E1.persona as "es1", E1.telefono as "tel1",E2.persona as "es2", E2.telefono as "tel2", E3.persona as "es3",E3.telefono as "tel3" FROM (servicios S inner join det_serv DS on S.id_servicios = DS.id_serv) inner join paises P on P.id_paises = DS.id_pai inner join productos PR on PR.id_productos = DS.id_prod inner join aplicaciones A on A.id_aplicaciones = DS.id_aplica inner join det_aplicaciones DA on A.id_aplicaciones = DA.id_aplica inner join veladores V on V.id_veladores = DA.resp inner join veladores E1 on E1.id_veladores = DA.esc_1 inner join veladores E2 on E2.id_veladores = DA.esc_2 inner join veladores E3 on E3.id_veladores = DA.esc_3 where lower(P.n_paises ) = $1 order by A.n_aplicaciones, pr.n_productos',[pais]);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json(response.rows);
};
//--------------ABM----------------------------------


const getPai =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM paises order by id_paises asc');
    res.status(200).json(response.rows); 
};

const getPa =  async (req, res) =>{
    const response = await pool.query('SELECT n_paises FROM paises order by n_paises asc');
    res.status(200).json(response.rows); 
};


const createPais = async (req,res)=>{
    const{ n_paises}=req.body;
   await pool.query('INSERT INTO paises (n_paises) VALUES ($1)', [n_paises]);
    console.log(req.body);
    res.send('creado');
};

const upPais = async (req,res)=>{
	const{ n_paises,id_paises}=req.body;
	console.log(req.body);
	await pool.query('UPDATE paises SET n_paises = $1 WHERE id_paises = $2', [n_paises,id_paises]);
    res.send('actualizado');
};

const delPais = async (req,res)=>{
	const{id_paises}=req.body;
	console.log(req.body);
	await pool.query('DELETE FROM paises WHERE id_paises = $1', [id_paises]);
    res.send('borrado');
};




//Fin de Paises-------------------------------------------------------------------------------------

//Servivio-------------------------------------------------------------------------------------


const getSrv =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM servicios order by id_servicios desc');
    res.status(200).json(response.rows); 
};

const createSrv = async (req,res)=>{
    const{ n_servicios}=req.body;
	await pool.query('INSERT INTO servicios (n_servicios) VALUES ($1)', [n_servicios]);
    console.log(req.body);
    res.send('creado');
};

const upSrv = async (req,res)=>{
	const{ n_servicios,id_servicios}=req.body;
	console.log(req.body);
	await pool.query('UPDATE servicios SET n_servicios = $1 WHERE id_servicios = $2', [n_servicios,id_servicios]);
    res.send('actualizado');
};

const delSrv = async (req,res)=>{
	const{ id_servicios}=req.body;
	console.log(req.body);
	await pool.query('DELETE FROM servicios WHERE id_servicios = $1', [id_servicios]);
    res.send('borrado');
};

//FIN Servivio-------------------------------------------------------------------------------------



//Producto-------------------------------------------------------------------------------------


const getPrd =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM productos order by id_productos desc');
    res.status(200).json(response.rows); 
};


const createPrd = async (req,res)=>{
    const{ n_productos}=req.body;
   await pool.query('INSERT INTO productos (n_productos) VALUES ($1)', [n_productos]);
    console.log(req.body);
    res.send('creado');
};

const upPrd = async (req,res)=>{
	const{ n_productos,id_productos}=req.body;
	console.log(req.body);
	await pool.query('UPDATE productos  SET n_productos = $1 WHERE id_productos = $2', [n_productos,id_productos]);
    res.send('actualizado');
};

const delPrd = async (req,res)=>{
	const{ id_productos}=req.body;
	console.log(req.body);
	await pool.query('DELETE FROM productos  WHERE id_productos = $1', [id_productos]);
    res.send('borrado');
};

// FIN Producto-------------------------------------------------------------------------------------

//Aplicacion--------------------------------------------------------------------------------------

const getApp =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM aplicaciones order by id_aplicaciones ASC');
    res.status(200).json(response.rows); 
};


const createApp = async (req,res)=>{
    const{ n_aplicaciones}=req.body;
	await pool.query('INSERT INTO aplicaciones (n_aplicaciones) VALUES ($1)', [n_aplicaciones]);
    console.log(req.body);
    res.send('creado');
};

const upApp = async (req,res)=>{
	const{ n_aplicaciones, id_aplicaciones}=req.body;
	console.log(req.body);
	await pool.query('UPDATE aplicaciones SET n_aplicaciones = $1 WHERE id_aplicaciones = $2', [n_aplicaciones, id_aplicaciones]);
    res.send('actualizado');
};

const delApp = async (req,res)=>{
	const{ id_aplicaciones}=req.body;
	console.log(req.body);
	await pool.query('DELETE FROM aplicaciones WHERE id_aplicaciones = $1', [id_aplicaciones]);
    res.send('borrado');
};
// FIN Aplicacion-------------------------------------------------------------------------------------

//Veladores------------------------------------------------------------------------------------

const getUsers =  async (req, res) =>{
    const response = await pool.query('SELECT id_veladores, persona as persona, telefono as telefono, sup_inmediato as sup_inmediato, departamento as departamento FROM veladores order by id_veladores desc');
    res.status(200).json(response.rows); 
};


const createVel = async (req,res)=>{
    const{ persona, telefono, sup_inmediato, departamento}=req.body;
	console.log(req.body);
	await pool.query('INSERT INTO veladores (persona, telefono, sup_inmediato, departamento) VALUES ($1,$2,$3,$4)', [persona, telefono, sup_inmediato, departamento]);
    res.send('creado');
};


const upVel = async (req,res)=>{
	const{ id_veladores, persona, telefono, sup_inmediato, departamento}=req.body;
	console.log(req.body);
	await pool.query('UPDATE veladores SET persona = $1 , telefono = $2 , sup_inmediato = $3 , departamento = $4 WHERE id_veladores = $5', [ persona, telefono, sup_inmediato, departamento,id_veladores]);
    res.send('actualizado');
};

const delVel = async (req,res)=>{
	const{id_veladores}=req.body;
	console.log(req.body);
	await pool.query('DELETE FROM veladores WHERE id_veladores = $1', [ id_veladores]);

    res.send('borrado');
};
//FIN-Veladores--------------------------------------------------------------------------------



   
//Login----------------------------------------------------------------------------------------


//FIN Login----------------------------------------------------------------------------------------



module.exports={
	getSearch,
    getCert, createCert, upCert, delCert,
    getPais, getPai, createPais, upPais, delPais, getPa,
	getUser, createUser,
    getApp, createApp, upApp, delApp,
    getPrd, createPrd, upPrd, delPrd,
    getSrv, createSrv, upSrv, delSrv,
	getUsers, createVel, upVel, delVel,
	getDetSrv,createDetSrv,upDetSrv,delDetSrv,
	getDetApp,createDetApp,upDetApp,delDetApp,
	auth, Login, Logina, Logine, priv, pass
}