//Imports
const express 		          = require('express');
const logger 	              = require('morgan');
const bodyParser          	= require('body-parser');
const passport              = require('passport');
const pe                    = require('parse-error');
const cors                  = require('cors');
const userRouter            = require('./routes/user.router');
const containerRouter       = require('./routes/container.router');
const app = express();
const CONFIG = require('./cfg/app.cfg');
const db = require("./db");

//Configurations
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cors());


app.use('/daemon/users', userRouter);
app.use('/daemon/containers', containerRouter);

//Handle root route
app.get('/', function(req, res){
	res.statusCode = 200;
	res.json({status:"success", message:"Sail Daemon",version:"1.0.0"});
});


//Handle bad route requests
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error Handler
app.use(function(err, req, res, next) {
  res.statusCode = 200;
  res.json({status:"failed", err:err.message});
});


//Handle not caught rejections
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});


app.listen(CONFIG.app_port, () =>{
  console.log('┏━━━┓ ┏━━━┓ ┏━━┓ ┏┓');
  console.log('┃┏━┓┃ ┃┏━┓┃ ┗┫┣┛ ┃┃');
  console.log('┃┗━━┓ ┃┃ ┃┃  ┃┃  ┃┃');
  console.log('┗━━┓┃ ┃┗━┛┃  ┃┃  ┃┃ ┏┓');
  console.log('┃┗━┛┃ ┃┏━┓┃ ┏┫┣┓ ┃┗━┛┃');
  console.log('┗━━━┛ ┗┛ ┗┛ ┗━━┛ ┗━━━┛');
  console.log('Daemon Enviroment: '+ CONFIG.app_enviroment +'\nSail\'s demon hast started succesfully on port '+CONFIG.app_port);
});

module.exports = app;

