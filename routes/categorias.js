const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT,tieneRol} = require('../middlewares');
const {crearCategoria,obtenerCategorias,obtenerCategoria, actualizarCategoria, borrarCategoria}=require('../controllers/categorias');
const { existeCategoriaById } = require('../helpers/db-validators');
const router =Router();


//obtener categorias - publico
router.get('/',obtenerCategorias);
//obtener categoria por id - publico
router.get('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],obtenerCategoria);
//crear categoria - privado - cualquier rol con token
router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria );
//actualizar categoria - privado - cualquier rol con token
router.put('/:id',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);
//borar categoria -admin
router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE',),
    check('id','No es un ID valid').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],borrarCategoria);










module.exports =router;