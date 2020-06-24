const {Pool}= require('pg');

const pool = new Pool({
    host:'dbgit2',
    user: 'rusa',
    password: 'rusa',
    database: 'rusa_db',
    port: '5432'
});





const getUser =  async (req, res) =>{
    const response = await pool.query('SELECT usuario, pass, nombre, email FROM usuarios order by id_user');
    res.status(200).json(response.rows); 
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

//Certificados-------------------------------------------------------------------------------------


const getCert =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM certificados order by id');
    res.status(200).json(response.rows); 
};

const createCert = async (req,res)=>{
    const{ nombre, pais, emisor, reponsable,telefono, vencimiento}=req.body;
   await pool.query('INSERT INTO certificados (nombre, pais, emisor, reponsable,telefono, vencimiento) VALUES ($1,$2,$3,$4,$5,$6)', [nombre, pais, emisor, reponsable,telefono, vencimiento]);
    console.log(req.body);
    res.send('creado');

};


const upCert = async (req,res)=>{
    const{ nombre, pais, emisor, reponsable,telefono, vencimiento, id}=req.body;
	await pool.query('UPDATE certificados SET nombre = $1, SET pais = $2, SET emisor= $3, SET reponsable = $4, SET telefono = $5, SET vencimiento = $6) WHERE id = $7', [nombre, pais, emisor, reponsable,telefono, vencimiento, id]);
    console.log(req.body);
    res.send('Actualizado');

};

const delCert = async (req,res)=>{
    const{id}=req.body;
	await pool.query('DELETE certificados WHERE id = $1', [id]);
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
    const response = await pool.query('SELECT * FROM paises order by id_paises desc');
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
	const{ id_paises}=req.body;
	console.log(req.body);
	await pool.query('DELETE paises WHERE id_paises = $1', [id_paises]);
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
	await pool.query('DELETE servicios WHERE id_servicios = $1', [id_servicios]);
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
	await pool.query('DELETE productos  WHERE id_productos = $1', [id_productos]);
    res.send('borrado');
};

// FIN Producto-------------------------------------------------------------------------------------

//Aplicacion--------------------------------------------------------------------------------------

const getApp =  async (req, res) =>{
    const response = await pool.query('SELECT * FROM aplicaciones order by id_aplicaciones desc');
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
	await pool.query('DELETE aplicaciones WHERE id_aplicaciones = $1', [id_aplicaciones]);
    res.send('borrado');
};
// FIN Aplicacion-------------------------------------------------------------------------------------

//Veladores-------------------------------------------------------------------------------------

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

const auth = async (req,res)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	console.log(req.body);
    const{ usuario, pass}=req.body;
	const response = await pool.query('SELECT usuario, pass FROM usuarios WHERE usuario = $1 AND pass = $2', [usuario, pass]);
	//response.set('Access-Control-Allow-Origin', '*');

	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	//res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	console.log(response.rows)
	if(response.rows == false){
		//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/Login');
		
		res.status(401);
		res.send('false');
		
	}
	else{
	//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/Login');

    res.status(200).json(response.rows);
	res.send('true');
	}


};

//FIN Login----------------------------------------------------------------------------------------



module.exports={
	getSearch,
    getCert, createCert, upCert, delCert,
    getPais, getPai, createPais, upPais, delPais,
	getUser, createUser,
    getApp, createApp, upApp, delApp,
    getPrd, createPrd, upPrd, delPrd,
    getSrv, createSrv, upSrv, delSrv,
	getUsers, createVel, upVel, delVel,
	auth
}