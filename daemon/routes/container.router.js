const express 			= require('express');
const containrRouter 			  = express.Router();
const ContainerController 	= require('../controllers/container.controller');
const passport      	= require('passport');
require('../middleware/passport')(passport);


containrRouter.post(    '/start',      /*passport.authenticate('jwt', {session:false}), */ ContainerController.start);                                                    // C
containrRouter.post(    '/stop',       /*passport.authenticate('jwt', {session:false}), */ ContainerController.stop);   
containrRouter.post(    '/restart',    /*passport.authenticate('jwt', {session:false}), */ ContainerController.restart);   
containrRouter.post(    '/create',     /*passport.authenticate('jwt', {session:false}), */ ContainerController.create);   
containrRouter.post(    '/remove',     /*passport.authenticate('jwt', {session:false}), */ ContainerController.remove);   
containrRouter.post(    '/status',     /*passport.authenticate('jwt', {session:false}), */ ContainerController.status);   


module.exports = containrRouter; 