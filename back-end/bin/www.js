/**
 * express server setup
 */

'use strict';

/***********************************
 **** node module defined here *****
 ***********************************/
const EXPRESS      = require("express");
const BODY_PARSER  = require("body-parser");
const ALLFILES     = require("./../filebundle");
const PATH         = require("path");
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger');//v1 api routes

/**creating express server app for server */
const app         = EXPRESS();

/********************************
 ***** Server Configuration *****
 ********************************/
    app.set('port', ALLFILES.CONFIG.ServerConfig.PORT);
    app.set('view engine', 'jade');
    app.use(EXPRESS.static("client"));
    app.use(BODY_PARSER.json({limit: '50mb'}));
    app.use(BODY_PARSER.urlencoded({ limit: '50mb', extended: true }));
    app.use( EXPRESS.static(__dirname + '/../uploads'));



/** middleware for api's logging with deployment mode */
    let apiLooger = (req, res, next)=>{
            ALLFILES.COMMONSERVICE.messageLogs(null, `api hitted ${req.url} ${ process.env.NODE_ENV}`);
            next();
    };

    /** Used logger middleware for each api call **/
    app.use(apiLooger);

    /*******************************
     *** For handling CORS Error ***
     *******************************/
    app.all('/*', (REQUEST, RESPONSE, NEXT) => {
        RESPONSE.header('Access-Control-Allow-Origin', '*');
        RESPONSE.header('Access-Control-Allow-Headers','Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        RESPONSE.header('Access-Control-Allow-Methods','POST, GET, DELETE, PUT, OPTIONS');
        RESPONSE.header('Access-Control-Max-Age',1800);
        NEXT();
    });


/*******************************
 ****** initializing routes ****
 *******************************/
require('../server/routes')(app);

/*******************************
 ********** swagger ************
 *******************************/
// app.use('/api/v1/', require('./routes/v1'));
app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


/** server listening */
module.exports = () => {

    /** Server is running here */
    app.listen(ALLFILES.CONFIG.ServerConfig.PORT, (Error)=>{
        Error ? process.exit(0)
            : ALLFILES.COMMONSERVICE.messageLogs(null, `**************Server is running on ${ALLFILES.CONFIG.ServerConfig.PORT} **************`);
    });
};
