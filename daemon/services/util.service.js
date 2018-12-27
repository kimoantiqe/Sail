const {to} = require('await-to-js');
const pe = require('parse-error');
const jwt           	= require('jsonwebtoken');
const CONFIG            = require('../cfg/jwt.cfg');
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');



module.exports.to = async (promise) => {
    let err, res;
    [err, res] = await to(promise);
    if(err) return [pe(err)];

    return [null, res];
};

module.exports.ReE = function(res, err, code){ // Error Web Response
    if(typeof err == 'object' && typeof err.message != 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json({success:false, error: err});
};

module.exports.ReS = function(res, data, code){ // Success Web Response
    let send_data = {success:true};

    if(typeof data == 'object'){
        send_data = Object.assign(data, send_data);//merge the objects
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.TE = TE = function(err_message, log){ // TE stands for Throw Error
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};

module.exports.getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined' && typeof body.username != 'undefined'){
        return body.username
    }
    return null;
}

module.exports.generateJasonToken = function(id,username){
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer "+jwt.sign({_id:id,username:username}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
}

module.exports.comparePassword=  async function(unHashedPass,user){
    let err, pass;
    if(!user.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(unHashedPass,user.password));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return user;
}

module.exports.hashPassword = async function(password){
     let salt, hash;
     [err, salt] = await to(bcrypt.genSalt(10));
     if(err) TE(err.message, true);
 
     [err, hash] = await to(bcrypt.hash(password, salt));
     if(err) TE(err.message, true);

     return hash;
}