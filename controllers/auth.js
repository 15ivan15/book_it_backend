const bcrypt = require('bcryptjs');
const User = require('../models/users')
const { generatorJWT } = require('../helpers/generator-jwt')

const login = async (req, res) => {
    const { usser, password } = req.body;
    try {
        const user = await User.findOne({ usser, state: true });
        if (!user) {
            return res.json({
                message: 'Usuario no existe'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.json({
                message: 'Usuario / Contraseña incorrecto'
            })
        }
        const token = await generatorJWT(user._id);

        res.json({
            message: token,
            data: user
        })
    } catch (err) {
        res.json({
            message: 'Error interno'
        })
    }
}

module.exports = {
    login
}