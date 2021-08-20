const User = require('../models/users');

const emailExists = async(email='')=>{
    const user = await User.findOne({email});
    if(user){
        return message = `El correo ${email} ya se encuentra registrado`
    }
}

const usserExists = async(usser='')=>{
    const user = await User.findOne({usser});
    if(user){
        return message = `El usuario ${usser} ya se encuentra registrado`
    }
}

const usserNotExists = async(usser='')=>{
    const user = await User.findOne({usser});
    if(!user){
        return message = `El usuario ${usser} no se encuentra registrado`
    }
}
module.exports={
    emailExists,
    usserExists,
    usserNotExists
}