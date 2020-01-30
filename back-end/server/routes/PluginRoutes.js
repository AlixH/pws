'use strict';
let Controller = require('../controller');
let auth = require('../service/auth');

module.exports = (Application) => {

    Application.route('/plugins').get(Controller.PluginController.getAll);
    Application.route('/plugins').post(Controller.PluginController.create);
    Application.route('/plugins/:pluginId').get(Controller.PluginController.getById);
    Application.route('/plugins/:pluginId').delete(Controller.PluginController.deleteById);
};

