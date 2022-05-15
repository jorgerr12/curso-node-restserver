const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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


const gooleSingIn =async (req,res = response, next)=>{
    const {id_token}= req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token);
        let usuario = await User.findOne({correo});
        
        if(!usuario){
            const data = {
                nombre,
                correo,
                password:'123456',
                google:true

            };
            usuario = new User(data);
            console.log(usuario);
            await usuario.save();
        }
        

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administrador, usuario bloqueado'
            });
        }

        //Geberar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg:'el token no se pudo verificar'
        })
    }

    
}



module.exports ={
    login,
    gooleSingIn
}