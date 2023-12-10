import {getConnection} from "./../database/conexion";

const getUsuarios = async (req, res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from usuario");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateUsuario = async (req, res)=>{

    try {
        
        const {id, username, email, password} = req.body;
        if(id === undefined || username === undefined || email === undefined || password === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE usuario SET usuario = '${username}', 
                                                      email = '${email}', 
                                                      password = '${password}' 
                                                WHERE id = '${id}'`);
        res.status(200).json({"message":"Update user Ok"})
        //res.send(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

    
};

const delUsuario = async (req, res)=>{

    try {
        //const { username } = req.body;
        const {id} = req.params;
        //el params reconoce al id en el query
        const connection = await getConnection();
        const sql = "DELETE FROM usuario WHERE id = ?";
        const result = await connection.query(sql, [id]);
        res.status(200).json({"message":"Delete user Ok"})
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUsuario = async (req, res)=>{

    try {
        //const { username } = req.params;
        const {username} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from usuario WHERE usuario = ?", username);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }

    
};

const addUsuario = async (req, res) =>{
    try {
        const {username, email, password} = req.body;
        
        if(username === undefined || email === undefined || password === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        
        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO usuario (usuario, email, password) 
                                                        VALUES ('${username}','${email}','${password}')`);
        res.json({"message":"Usuario Registrado Correctamente"});
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getUsuarios,
    getUsuario,
    addUsuario,
    delUsuario,
    updateUsuario
};