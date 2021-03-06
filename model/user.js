const {Schema,model} = require('mongoose');


const UserSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es oblicatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es oblicatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es oblicatorio'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },

});

UserSchema.methods.toJSON = function(){

    const {__v,password,_id,...user}=this.toObject();
    user.uid=_id;
    return user;

}

module.exports = model('User',UserSchema);