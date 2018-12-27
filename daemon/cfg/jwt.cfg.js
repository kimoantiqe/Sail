require('dotenv').config();

let CONFIG = {} 

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'test123123';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

module.exports = CONFIG;