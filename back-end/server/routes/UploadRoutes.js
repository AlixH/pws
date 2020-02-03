'use strict';
let Controller = require('../controller');
let auth = require('../service/auth');

module.exports = (Application) => {
    Application.route('/uploadfile').post(Controller.UploadController.uploadFile);
    Application.route('/getfile').post(Controller.UploadController.getFile);
};

