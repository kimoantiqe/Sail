const express 			= require('express');
const containrRouter 			  = express.Router();
const ContainerController 	= require('../controllers/container.controller');
const passport      	= require('passport');
require('../middleware/passport')(passport);


containrRouter.post(    '/container/start',      passport.authenticate('jwt', {session:false}), ContainerController.start);                                                    // C
containrRouter.post(    '/container/stop',       passport.authenticate('jwt', {session:false}), ContainerController.stop);   
containrRouter.post(    '/container/restart',    passport.authenticate('jwt', {session:false}), ContainerController.restart);   
containrRouter.post(    '/container/create',     passport.authenticate('jwt', {session:false}), ContainerController.create);   
containrRouter.post(    '/container/remove',     passport.authenticate('jwt', {session:false}), ContainerController.remove);   
containrRouter.post(    '/container/status',     passport.authenticate('jwt', {session:false}), ContainerController.status);   


module.exports = containrRouter;