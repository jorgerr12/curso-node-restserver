const {response} = require('express');




const usuariosGet = (req,res= response)=>{

    const {a,nombre,apikey} = req.query;
    res.json({
        msj:"get API - controlador",
        a,nombre,apikey
    })
}

const usuariosPost = (req,res= response)=>{

    const {nombre,edad} = req.body;

    res.json({
        msj:"POST API - controlador",
        nombre,
        edad
    })
}

const usuariosPut= (req,res= response)=>{

    const id = req.params.id;
    res.json({
        msj:"PUT API - Controlador",
        id
    })
}
const usuariosDelete=(req,res= response)=>{
    res.json({
        msj:"DELETE API - Controlador"
    })
}

module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}