const {response} = require('express');
const User = require('../model/user');
const bcryptjs = require('bcryptjs');




const usuariosGet = async(req,res= response)=>{
    const {limite = 5,desde = 0}= req.query;
    const query = {estado:true}

    const [total,users] = await Promise.all([await User.countDocuments(query),
        await User.find(query)
            .skip(desde)
            .limit(limite)])
    res.json({
        total,
        users
    })
}

const usuariosPost = async (req,res= response)=>{

    
    const {nombre,correo,password,rol} = req.body;
    const user = new User({nombre,correo,password,rol});

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);

    //guardar en BD
    await user.save();

    res.json({
        user
    })
}

const usuariosPut=async (req,res= response)=>{

    const id = req.params.id;
    const {_id,password,google,correo,...resto}=req.body;

    //TODO validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id,resto);

    res.json({
        user
    })
}
const usuariosDelete=async(req,res= response)=>{
    const {id} = req.params;
 
    const user = await User.findByIdAndUpdate(id,{estado:false});
    
    res.json({user})
}

module.exports ={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}