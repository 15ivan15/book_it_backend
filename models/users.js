const { Schema, model } = require('mongoose');
const UsersSchema = Schema({
    name: {
        type: String,
        required: [true, 'Schema: debe ingresar el nombre']
    },
    lastname: {
        type: String,
        required: [true, 'Schema: debe ingresar el apellido']
    },
    usser: {
        type: String,
        required: [true, 'Schema: debe ingresar el usuario'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Schema: debe ingresar el correo electrónico'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Schema: debe ingresar el contraseña']
    },
    state: {
        type: Boolean,
        default: true
    },
    books: [{
        type: String
    }],
});

UsersSchema.methods.toJSON = function () {
    const { __v, password, state, _id, ...user } = this.toObject();
    return user;
}

module.exports = model('User', UsersSchema);