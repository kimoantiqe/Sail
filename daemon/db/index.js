const path = require('path');
const Datastore = require('nedb-promises');
const db = {};


const userStoreOpts ={
    filename: path.join(__dirname, 'data/users.db'),
    timestampData: true,
    autoload: true
};
   
const containerStoreOpts ={
     filename: path.join(__dirname, 'data/container.db'),
     timestampData: true,
     autoload: true
};
   
db.users = Datastore.create(userStoreOpts);
db.robots = Datastore.create(containerStoreOpts);

db.users.ensureIndex({ fieldName: 'username', unique:true});

module.exports = db;