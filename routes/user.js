
const {Router} = require('express');
const { check } = require('express-validator');
const { esRolValido, validarEmail, existeUsuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet,
        usuariosPost, 
        usuariosPut, 
        usuariosDelete } = require('../controllers/user');


const router = Router();


router.get('/',usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(validarEmail),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost);

router.put('/:id',[
    check('id','No es un ID valid').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);

router.delete('/:id',[
    check('id','No es un ID valid').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
    ],usuariosDelete);















module.exports = router;