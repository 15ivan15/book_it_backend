const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateData } = require('../middlewares/validate-data')
const { usserNotExists } = require('../helpers/req-validators')

const router = Router();

router.post('/login', [
    check('usser').custom(usserNotExists),
    check('password', 'La contraseña debe ser de mínimo 6 dígitos').isLength({ min: 6}),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateData
], login);

module.exports = router;