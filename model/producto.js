const { Schema, model } = require("mongoose");

const ProductoSchema = Schema({
    nombre:{
        type:String,
        require:[true,'la nombre  es obligatoria'],
        unique:true
    },
    estado:{
            type:Boolean,
            default:true,
            require:true
        },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        require:true
    },
    descripcion:{type:String},
    disponible:{type:Boolean,default:true}
    
});

ProductoSchema.methods.toJSON = function(){

    const {__v,estado,...data}=this.toObject();
    return data;

}
module.exports = model('Producto',ProductoSchema);