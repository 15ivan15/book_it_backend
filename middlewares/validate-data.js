const {validationResult} = require('express-validator');

const validateData = (req, res, next) =>{
    const err = validationResult(req);
    
    if(!err.isEmpty()){
        return res.json({
            message
        });
    }
    next();
}
module.exports={
    validateData
}