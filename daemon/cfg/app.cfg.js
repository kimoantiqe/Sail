require('dotenv').config();

let CONFIG = {} 

CONFIG.app_enviroment          = process.env.APP_ENVIROMENT   || 'development';
CONFIG.app_port                = process.env.APP_PORT  || '3000';

module.exports = CONFIG;