const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const validateJWT = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).json({
            msg: 'La petición require un token'
        })
    }
    try {
        const { _id } = jwt.verify(token, config.get('SECRETORPRIVATEKEY'));
        const user = await User.findById(_id);

        if (!user && !user.state) {
            return res.status(401).json({
                msg: 'Token no es válido'
            })
        }
        req.user = user
        next();
        
    } catch (err) {
        return res.status(401).json({
            msg: 'Token no es válido'
        })
    }
}

module.exports = {
    validateJWT
}