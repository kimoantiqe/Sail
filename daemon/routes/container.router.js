const express 			= require('express');
const containrRouter 			  = express.Router();
const UserController 	= require('../controllers/user.controller');
const passport      	= require('passport');
require('../middleware/passport')(passport);


/* GET home page. */
containrRouter.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

containrRouter.post(    '/users',           UserController.create);                                                    // C
containrRouter.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
containrRouter.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
containrRouter.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
containrRouter.post(    '/users/login',     UserController.login);


module.exports = containrRouter;