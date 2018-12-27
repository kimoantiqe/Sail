const db = require("../db");
const authService   = require('../services/auth.service');
const { to, ReE, ReS,generateJasonToken , hashPassword }  = require('../services/util.service');

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if(!body.username){
        return ReE(res, 'Please enter a username to register.');
    } else if(!body.password){
        return ReE(res, 'Please enter a password to register.');
    }else{
        let err, user;
        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Successfully created new user.'}, 201);
    }
}
module.exports.create = create;

const get = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    return ReS(res, {user:user});
}
module.exports.get = get;

const update = async function(req, res){
    let err, user, data
    user = req.user;
    data = req.body;
 
    //A password change is requested , rehash before saving
    let hash;
    if(data.password){
        [err, hash] = await to(hashPassword(data.password));
        if(err) TE(err.message, true);
        data.password = hash;
    }

    [err, user] = await to(db.users.update({username: user.username},{ $set: data},{returnUpdatedDocs :true}));

    if(err){
        console.log(err, user);
        if(err.message.includes(data.username+', it violates the unique constraint')){
                return ReE(res, 'username already in use');
        }
    }
    return ReS(res, {message :'Succesfully updated '+user.username});
}
module.exports.update = update;

const remove = async function(req, res){
    let user, err;
    user = req.user;

    [err, user] = await to(db.users.remove());
    if(err) return ReE(res, 'error occured trying to delete user');

    return ReS(res, {message:'Deleted User'}, 204);
}
module.exports.remove = remove;


const login = async function(req, res){
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);
    console.log(user);
    return ReS(res, {token:generateJasonToken(user._id,user.username), user:user});
}
module.exports.login = login;