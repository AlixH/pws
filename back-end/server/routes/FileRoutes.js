'use strict';
let Controller = require('../controller');
let auth = require('../service/auth');

module.exports = (Application) => {
    Application.route('/files/upload').post(Controller.FileController.uploadFile);
    Application.route('/files/get').post(Controller.FileController.getFile);
};

