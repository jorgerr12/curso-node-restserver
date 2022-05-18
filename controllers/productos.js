const { response } = require("express");
const {Producto,Categoria}= require('../model');

//ObtenerProductos - paginado-total-populate

const obtenerProductos= async(req,res=response)=>{
    const {limite = 5,desde=0}=req.query;
    const query={estado:true}
    const [total,productos] = await Promise.all([await Producto.countDocuments(query),
        await Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
            .skip(desde)
            .limit(limite)]);
            res.json({
                total,
                productos
            });
}
//obtenerProducto - populate{}
const obtenerProducto= async(req,res=response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre');

            res.json({
                producto
            });
}


const crearProducto =async (req,res =response)=>{
    //Generar la data a guardar
  
    const {estado,usuario,...data}=req.body;
    data.nombre= data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const producto = new Producto(data);
    console.log(producto)

    //Guardar DB

    await producto.save();

    res.status(201).json(producto) 
}


//actualizarProducto
const actualizarProducto= async(req,res=response)=>{
    const id = req.params.id;
    const {estado,usuario,...data} = req.body;
    if(data.nombre){
        data.nombre= req.body.nombre.toUpperCase();
    }
   
    data.usuario=req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.status(201).json(producto)

}

//borrarProducto - estado:false

const borrarProducto=async(req,res= response)=>{
    const {id} = req.params;
    const data ={
        estado:false,
        usuario:req.usuario._id
    }
    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    
    res.json({producto})
}


module.exports={
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    crearProducto
}