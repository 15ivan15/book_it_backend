const { Router } = require('express');
const {check} = require('express-validator');
const {validateData} = require('../middlewares/validate-data')
const {validateJWT} = require('../middlewares/validate-jwt')
const {emailExists} = require('../helpers/req-validators')
const {usserExists} = require('../helpers/req-validators')
const {usserNotExists} = require('../helpers/req-validators')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/:usser', [
    check('usser').custom(usserNotExists),
    /* check('password', 'La contraseña debe ser de mínimo 6 dígitos').isLength({ min: 6}), */
    validateData
],usuariosGet );
router.put('/:usser', [
    check('usser').custom(usserNotExists),
    check('password', message = 'La contraseña debe ser de mínimo 6 dígitos').isLength({ min: 6}),
    validateData
],usuariosPut );
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExists),
    check('usser').custom(usserExists),
    check('password', 'La contraseña debe ser de mínimo 6 dígitos').isLength({ min: 6}),
    validateData
],usuariosPost );

router.delete('/:usser/:password',[
    validateJWT,
    check('usser').custom(usserNotExists),
    validateData
], usuariosDelete );

router.patch('/', usuariosPatch );
module.exports = router;