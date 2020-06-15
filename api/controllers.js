const {Pool}= require('pg');

const pool = new Pool({
    host:'dbgit2',
    user: 'rusa',
    password: 'rusa',
    database: 'rusa_db',
    port: '5432'
});



const getUsers =  async (req, res) =>{
    console.log(req);
    const response = await pool.query('SELECT * FROM veladores');
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const getSearch =  async (req, res) =>{
    const { busqueda }=req.body;
    like = "%" + req.body.busqueda + "%";
    console.log(like);
    const response = await pool.query('select PR.n_productos, S.n_servicios, P.n_paises, A.n_aplicaciones, DA.nivel , V.nombre,V.apellido,V.telefono, V.departamento , V.sup_inmediato'+ 
            ' from (servicios S inner join det_serv DS on S.id_servicios = DS.id_serv) inner join'+
            ' paises P on P.id_paises = DS.id_pai inner join'+
            ' productos PR on PR.id_productos = DS.id_prod inner join'+
            ' aplicaciones A on A.id_aplicaciones = DS.id_aplica inner join'+ 
            ' det_aplicaciones DA on A.id_aplicaciones = DA.id_aplica inner join'+
            ' veladores V on v.id_veladores = DA.id_vel'+
            ' where lower(A.n_aplicaciones ) like $1 or lower(S.n_servicios ) like $1 or lower(V.nombre ) like $1 or lower(V.apellido ) like $1'+
            ' order by A.n_aplicaciones, pr.n_productos , Da.nivel',[like]);
    console.log(busqueda);
    console.log(response.rows);
    res.status(200).json(response.rows);
};


const getPais =  async (req,res) =>{
    pais = req.params.id.toLowerCase();
    const response = await pool.query('SELECT PR.n_productos AS "pro",S.n_servicios AS "ser",A.n_aplicaciones AS "app", V.persona AS "du", E1.persona as "es1", E1.telefono as "tel1",E2.persona as "es2", E2.telefono as "tel2", E3.persona as "es3",E3.telefono as "tel3" FROM (servicios S inner join det_serv DS on S.id_servicios = DS.id_serv) inner join paises P on P.id_paises = DS.id_pai inner join productos PR on PR.id_productos = DS.id_prod inner join aplicaciones A on A.id_aplicaciones = DS.id_aplica inner join det_aplicaciones DA on A.id_aplicaciones = DA.id_aplica inner join veladores V on V.id_veladores = DA.resp inner join veladores E1 on E1.id_veladores = DA.esc_1 inner join veladores E2 on E2.id_veladores = DA.esc_2 inner join veladores E3 on E3.id_veladores = DA.esc_3 where lower(P.n_paises ) = $1 order by A.n_aplicaciones, pr.n_productos',[pais]);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.status(200).json(response.rows);
};



//creacion-----------------------------------------------------------------------------------------------

const createCert = async (req,res)=>{
    const{ nombre, pais, emisor, reponsable,telefono, vencimiento}=req.body;
   await pool.query('INSERT INTO certificados (nombre, pais, emisor, reponsable,telefono, vencimiento) VALUES ($1,$2,$3,$4,$5,$6)', [nombre, pais, emisor, reponsable,telefono, vencimiento]);
    console.log(req.body);
    res.send('creado');

};

const createUser = async (req,res)=>{
    const{ usuario, pass, nombre, email}=req.body;
   await pool.query('INSERT INTO usuarios (usuario, pass, nombre, email) VALUES ($1,$2,$3,$4)', [usuario, pass, nombre, email]);
    console.log(req.body);
    res.send('creado');
};

const createApp = async (req,res)=>{
    const{ n_aplicaciones}=req.body;
   await pool.query('INSERT INTO aplicaciones (n_aplicaciones) VALUES ($1$4)', [n_aplicaciones]);
    console.log(req.body);
    res.send('creado');
};
const createPrd = async (req,res)=>{
    const{ n_productos}=req.body;
   await pool.query('INSERT INTO productos (n_productos) VALUES ($1)', [n_productos]);
    console.log(req.body);
    res.send('creado');
};

const createSrv = async (req,res)=>{
    const{ n_servicios}=req.body;
   await pool.query('INSERT INTO servicios (n_servicios) VALUES ($1)', [n_servicios]);
    console.log(req.body);
    res.send('creado');
};

const createVel = async (req,res)=>{
    const{ nombre, apellido, telefono, sup_inmediato, departamento}=req.body;
   await pool.query('INSERT INTO veladores (nombre, apellido, telefono, sup_inmediato, departamento) VALUES ($1,$2,$3,$4,$5)', [nombre, apellido, telefono, sup_inmediato, departamento]);
    console.log(req.body);
    res.send('creado');
};

//END-creacion--------------------------------------------------------------------------------
//updates-------------------------------------------------------------------------------------


//END-updates--------------------------------------------------------------------------------



module.exports={
    getUsers,
    createCert,
    getSearch,
    getPais,
    createUser,
    createApp,
    createPrd,
    createSrv,
    createVel
}