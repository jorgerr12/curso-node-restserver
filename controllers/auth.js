const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const User = require('../model/user');


const login = async(req,res)=>{

    const {correo,password}= req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }


        //Si el usuario esta activo
        if(!user.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            });
        }


        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT

        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
       return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
    
}



module.exports ={
    login
}