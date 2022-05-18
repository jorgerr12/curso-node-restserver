const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            auth:'/api/auth',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            buscar:'/api/buscar'
        }
        

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
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.usuarios,require('../routes/user'));
        this.app.use(this.paths.categorias,require('../routes/categorias'));
        this.app.use(this.paths.productos,require('../routes/productos'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`servidor corriendo en el puerto:`,this.port);
        })

    }
}


module.exports= Server;
