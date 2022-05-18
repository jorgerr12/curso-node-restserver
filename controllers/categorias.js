const { response } = require("express");
const {Categoria}= require('../model');

//ObtenerCategorias - paginado-total-populate

const obtenerCategorias= async(req,res=response)=>{
    const {limite = 5,desde=0}=req.query;
    const query={estado:true}
    const [total,categorias] = await Promise.all([await Categoria.countDocuments(query),
        await Categoria.find(query)
        .populate('usuario','nombre')
            .skip(desde)
            .limit(limite)]);
            res.json({
                total,
                categorias
            });
}
//obtenerCategoria - populate{}
const obtenerCategoria= async(req,res=response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

            res.json({
                categoria
            });
}


const crearCategoria =async (req,res =response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    if(categoriaDB){
        return res.status(400).json({
            msg:"La categoria ya existe"
        });
    }

    //Generar la data a guardar
    const data ={
        nombre,
        usuario:req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB

    await categoria.save();

    res.status(201).json(categoria)
}


//actualizarCategoria
const actualizarCategoria= async(req,res=response)=>{
    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
    const data ={
        nombre,
        usuario:req.usuario._id
    }
    const categoriaDB = await Categoria.findOne({nombre});
    console.log(categoriaDB);
    if(categoriaDB){
        return res.status(400).json({
            msg:"La categoria ya existe"
        });
    }
    const categoria = await Categoria.findByIdAndUpdate(id,data);
    res.status(201).json(categoria)

}

//borrarCategoria - estado:false

const borrarCategoria=async(req,res= response)=>{
    const {id} = req.params;
    const data ={
        estado:false,
        usuario:req.usuario._id
    }
    const user = await Categoria.findByIdAndUpdate(id,data);
    
    res.json({user})
}


module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}