
'use strict';
let Controller = require('../controller');
let auth = require('../service/auth');

module.exports = (Application) => {

    // Application.route('/Users').get(Controller.UserController.register);

    Application.route('/users/authenticate').post(Controller.UserController.login);
    Application.route('/users/register').post(Controller.UserController.register);

};

