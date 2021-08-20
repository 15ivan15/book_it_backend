const config = require('config')
const jwt = require('jsonwebtoken');

const generatorJWT = (_id = '') => {
    return new Promise((resolve, reject) => {
        const payload = { _id };
        jwt.sign(payload, config.get('SECRETORPRIVATEKEY'), {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error al crear el token');
            } else {
                resolve(token);
            }
        })
    });
}
module.exports={
    generatorJWT
}