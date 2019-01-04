const dockerService = require('../services/docker.service.js');
const { to, ReS,ReE}    = require('../services/util.service');
const path = require('path');

const create = async function(req, res){
    let err,image,container;

    const loc = path.join(__dirname+'/../devtestimgs');
    [err,image] = await to(dockerService.buildDockerImage(loc,'devtestimgsapp','test'));
    if(err) return ReE(res, err, 422);
    res.image = image;
    
    [err,container] = await to(dockerService.createDockerContainer());
    if(err) return ReE(res, err, 422);
    res.container = container;

    return ReS(res, {message:'Successfully created new container.'}, 201);
}
module.exports.create = create;

const start = async function(req, res){
    //Todo
}
module.exports.start = start;

const stop = async function(req, res){
    //Todo
}
module.exports.stop = stop;

const remove = async function(req, res){
    //Todo
}
module.exports.remove = remove;

const status = async function(req, res){
    //Todo
}
module.exports.status = status;

const restart = async function(req, res){
    //Todo
}
module.exports.restart = restart;