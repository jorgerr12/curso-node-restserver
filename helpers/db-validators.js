
const { Categoria, Producto } = require('../model');
const Role =require('../model/role');
const User = require('../model/user');

const esRolValido = async(rol ='')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const validarEmail= async(correo='')=>{
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo ya existe`)
    }
}

const existeUsuarioById= async(id)=>{
    const existeUser= await User.findById(id);
    if(!existeUser){
        throw new Error(`El id no existe`)
    }
}

const existeCategoriaById= async(id)=>{
    const existeCategoria= await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe`)
    }
}
const existeProductoById= async(id)=>{
    const existeProducto= await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id no existe`)
    }
}
module.exports={
    esRolValido,
    validarEmail,
    existeUsuarioById,
    existeCategoriaById,
    existeProductoById
}