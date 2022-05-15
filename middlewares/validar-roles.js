const { response } = require("express");
const { validarJWT } = require("./validar-jwt");




const esAdminRole= (req,res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'se quiere verificar el rol sinn validar el tojen primero'
        })
    }
    const {rol,nombre}=req.usuario;

    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`El usuario: ${nombre} , no tiene permiso para realiazar esta accion`
        })
    }


    next()
}

const tieneRol = ( ...roles )=>{

    return (req,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'se quiere verificar el rol sinn validar el tojen primero'
            });
        }
    
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El usuario: ${req.usuario.nombre} , no tiene permiso para realiazar esta accion`
            });
        }
        next();
    }

}



module.exports={
    esAdminRole,
    tieneRol
}