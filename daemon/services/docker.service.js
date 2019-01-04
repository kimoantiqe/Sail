const {Docker} = require('node-docker-api');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const tar = require('tar-fs');


const promisifyStream = stream => new Promise((resolve, reject) => {
  stream.on('data', data => console.log(data.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
});


const buildDockerImage = (location,imageName,imageTag)  => new Promise((resolve, reject) =>{
    //Create tar stream
    const tarStream = tar.pack(location);
    
    //Build image
    docker.image.build(tarStream, {
        t: imageName+':'+imageTag
        })
        .then(stream => promisifyStream(stream))
        .then(resolve({imageName: imageName , imageTag: imageTag}))
        .catch(error => reject(error));
});
module.exports.buildDockerImage = buildDockerImage;


const createDockerContainer= ()  => new Promise((resolve, reject) =>  {
    docker.container.create({
        Image: 'devtestimgsapp:test',
        name: 'testimgafawaffawaafaboafaokafobandarafawf'+Date.now()
      })
      .then(container => resolve(container))
      .catch(error => reject(error));
});
module.exports.createDockerContainer = createDockerContainer;


const startDockerContainer= async function(req, res){
    //Todo
}
module.exports.startDockerContainer = startDockerContainer;

const stopDockerContainer = async function(req, res){
    //Todo
}
module.exports.stopDockerContainer = stopDockerContainer;

const removeDockerContainer = async function(req, res){
    //Todo
}
module.exports.removeDockerContainer = removeDockerContainer;

const statusDockerContainer = async function(req, res){
    //Todo
}
module.exports.statusDockerContainer = statusDockerContainer;

const restartDockerContainer = async function(req, res){
    //Todo
}
module.exports.restartDockerContainer = restartDockerContainer;