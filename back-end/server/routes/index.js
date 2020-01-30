
'use strict';

/**
 * Route handler
 * **/ 
module.exports = (Application) => {
    require("./UserRoutes")(Application);
    require("./PluginRoutes")(Application);
};
