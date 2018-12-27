require('dotenv').config();

let CONFIG = {} 

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mongo';
CONFIG.db_host      = process.env.DB_HOST       || 'localhost';
CONFIG.db_port      = process.env.DB_PORT       || '27017';
CONFIG.db_name      = process.env.DB_NAME       || 'name';
CONFIG.db_user      = process.env.DB_USER       || 'root';
CONFIG.db_password  = process.env.DB_PASSWORD   || 'db-password';

module.exports = CONFIG;