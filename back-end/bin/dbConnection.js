'use strict';

/*******************************
 *** MONGOOSE for connection ***
 *******************************/
let MONGOOSE = require('mongoose');
MONGOOSE.set('useNewUrlParser', true);
MONGOOSE.set('useFindAndModify', false);
MONGOOSE.set('useCreateIndex', true);
MONGOOSE.set('useUnifiedTopology', true);

/*******************************
 ***** Mongodb connection  *****
 *******************************/
module.exports = (URL) => {
    return new Promise((resolve, reject) => {
        MONGOOSE.connect(URL, (err, response) => {
            if (err)
                reject(err);
            else
                resolve(null);
        });
    })
};
