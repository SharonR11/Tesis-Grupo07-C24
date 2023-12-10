import app from "./app.js";
//import "./database.js";
import { PORT } from "./global.js";
//const config = require('./global.js');
import "./libs/initialSetup.js";
import conectarDB from './db.js';
//const conectarDB = require('./db.js');

conectarDB();

app.listen(PORT);
console.log("Server on port", app.get("port"));
