const db = require("../db");
const { to, TE,comparePassword,hashPassword,getUniqueKeyFromBody }    = require('../services/util.service');


const createUser = async function(userInfo){
    let unique_key, err;

    unique_key = getUniqueKeyFromBody(userInfo);
    userInfo.username = unique_key;

    if(!unique_key) TE('Please enter username to create user');
    if(!userInfo.password) TE('Please enter password to create user');

    let user;
    console.log(userInfo);

    //Hash password
    let hash;

    [err, hash] = await to(hashPassword(userInfo.password));
    if(err) TE(err.message, true);

    userInfo.password = hash;

    [err, user] = await to(db.users.insert(userInfo));
    if(err) TE('user already exists with that username');
    return user;
}
module.exports.createUser = createUser;

const authUser = async function(userInfo){//returns token
    let unique_key;

    let auth_info = {};
    auth_info.status = 'login';
    
    unique_key = getUniqueKeyFromBody(userInfo);
    userInfo.username = unique_key;

    if(!unique_key) TE('Please enter username to login');
    if(!userInfo.password) TE('Please enter password to login');
    
    let user; 
    [err, user] = await to(db.users.findOne({username:unique_key }));
    if(err) TE(err.message);

    if(!user) TE('Not registered');

    [err, user] = await to(comparePassword(userInfo.password,user));
    if(err) TE(err.message);

    return user;
}
module.exports.authUser = authUser;