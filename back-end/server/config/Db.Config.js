
'use strict';

/**
 * Db config handler
 * */

module.exports = {
    DATABASE    : "pws",
    PASSWORD    : "j4caBmVKZSk7GryL",
    DBURL       : process.env.DB_CON_STR || "mongodb+srv://user:j4caBmVKZSk7GryL@cluster0-gh7ae.gcp.mongodb.net/pws",
    HOST        : "cluster0-gh7ae.gcp.mongodb.net",
    PORT        : 27017,
    NAME        : "mongodb",
    CONNECTOR   : "mongodb",
};


