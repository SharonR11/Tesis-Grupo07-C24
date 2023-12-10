//import mysql from "promise-mysql";
var mysql =require('mysql');
import config from "./config";

const connection=mysql.createConnection({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});
// interactuar con bases de datos MySQL
const getConnection=()=>{
    return connection;
};

module.exports = {
    getConnection
};