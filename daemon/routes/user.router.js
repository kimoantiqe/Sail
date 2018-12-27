const express 			= require('express');
const userRouter 			  = express.Router();
const UserController 	= require('../controllers/user.controller');
const passport      	= require('passport');
require('../middleware/passport')(passport);


userRouter.post('/',UserController.create);                                                    // C
userRouter.get('/' ,passport.authenticate('jwt', {session:false}), UserController.get);        // R
userRouter.put('/' ,passport.authenticate('jwt', {session:false}), UserController.update);     // U
userRouter.delete('/',passport.authenticate('jwt', {session:false}), UserController.remove);     // D
userRouter.post('/login',UserController.login);


module.exports = userRouter;