const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT,tieneRol} = require('../middlewares');
const { existeCategoriaById,existeProductoById } = require('../helpers/db-validators');
const { crearProducto,obtenerProductos,obtenerProducto,actualizarProducto,borrarProducto } = require('../controllers/productos');
const router =Router();


//obtener categorias - publico
 router.get('/',obtenerProductos);
// obtener categoria por id - publico
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
 ],obtenerProducto);
//crear categoria - privado - cualquier rol con token
router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('categoria','categoria es obligatorio').not().isEmpty(),
    validarCampos
],crearProducto );
//actualizar categoria - privado - cualquier rol con token
router.put('/:id',[
     validarJWT,
     check('id').custom(existeProductoById),
     validarCampos
 ],actualizarProducto);
// //borar categoria -admin
 router.delete('/:id',[
     validarJWT,
     tieneRol('ADMIN_ROLE',),
     check('id','No es un ID valid').isMongoId(),
     check('id').custom(existeProductoById),
     validarCampos
 ],borrarProducto);










module.exports =router;