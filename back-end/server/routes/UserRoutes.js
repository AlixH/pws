
'use strict';
let Controller = require('../controller');


module.exports = (Application) => {

    // Application.route('/Users').get(Controller.UserController.register);

    Application.route('/users/authenticate').post(Controller.UserController.login);
    Application.route('/users/register').post(Controller.UserController.register);

};

