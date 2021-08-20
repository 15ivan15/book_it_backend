const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/users')

/* const usuariosGet = async (req = request, res = response) => {
    const { usser, password } = req.body;
    const user = await User.findOne({ usser })

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario / Contraseña incorrecto'
        })
    }
    res.json({
        message: 'Usuario encontrado correctamente!',
        data: user
    });

} */
const usuariosGet = async (req = request, res = response) => {
    const { usser } = req.params;
    const user = await User.findOne({ usser })

    /* const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Usuario / Contraseña incorrecto'
        })
    } */
    res.json({
        message: 'Usuario encontrado correctamente!',
        data: user
    });

}

const usuariosPost = async (req, res = response) => {

    const { name, lastname, usser, email, password } = req.body;
    const user = new User({ name, lastname, usser, email, password });
    const user1 = await User.findOne({ usser })
    const user2 = await User.findOne({ email })

    if (user1) {
        res.json({
            message: `El usuario ${usser} ya existe`
        });
    } else if (user2) {
        res.json({
            message: `El correo ${email} ya existe`
        });
    } else {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        user.save();

        res.json({
            message: 'Usuario creado correctamente!',
            data: user
        });
    }
    //cifrado de la contraseña

}

const usuariosPut = async (req, res = response) => {

    const { usser } = req.params;
    const {password, ...data } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(password, salt);
    }
    const user = await User.findOneAndUpdate({ usser }, data)
    console.log(user)
    res.json({
        message: 'Usuario actualizado correctamente!',
        data: user
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { usser, password } = req.params;
    console.log(password)

    const user = await User.findOneAndUpdate({ usser }, { state: false });

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
        return res.json({
            message: 'Usuario / Contraseña incorrecto'
        })
    }
    user.state = false;
    user.save();

    res.json({
        message: 'Usuario eliminado correctamente!',
        data: user
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}