const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath= '/api/usuarios';
        this.authPath = '/api/auth'

        //concectar a base de datos
        this.conectarDB();


        //Middelwares
        this.middlewares();
        // rutas
        this.routes();
    }
    
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //lectura y parseo de del body
        this.app.use(express.json());
        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`servidor corriendo en el puerto:`,this.port);
        })

    }
}


module.exports= Server;
