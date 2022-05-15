const { request } = require("express")
const { response } = require("express")
const jwt = require("jsonwebtoken");
const User = require("../model/user");



const validarJWT=async(req=request,res=response,next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }
    try {

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuario =await User.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido - usuario no existe'
            })
        }
        //verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido - usuario con estado: false'
            })
        }

        req.usuario= usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }

    console.log(token);
    
   
}

module.exports ={
    validarJWT
}