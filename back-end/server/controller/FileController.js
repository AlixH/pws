const MongoClient = require('mongodb');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const jwt = require('jsonwebtoken');
const config = require('../config');
const ObjectID = require('mongodb').ObjectID;
const path     = require("path");
const Unzipper = require("decompress-zip");
const fs = require("fs");

const extract = require('extract-zip');

let storage = new GridFsStorage({
    url:  config.DbConfig.DBURL,
    file: (req, file) => {
        return {
            bucketName: 'plugins',       //Setting collection name, default name is fs
            filename: file.originalname     //Setting file name to original name of file
        }
    }
});

const localStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    }
});


let upload = null;
let localDestination = multer({storage: localStorage});


const unzipFile = (source, destination, next) => {

    console.log(`Will unzip ${source} in ${destination}`);
    extract(source, {dir: destination},function (err) {
        if (err != undefined) {
            console.log(`__error in unzipFile: ${err}`);
        }
   });

    next();
}

async function fileUpload(req, res, next) {
    localDestination.single('file1')(req, res, next)
    next();
}


storage.on('connection', (db) => {
    //Setting up upload for a single file
    upload = multer({
        storage: storage
    }).single('file1');
});


module.exports.uploadFile = async (req, res) => {

    upload(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(500).send({title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
        }

        const pluginId = req.body.pluginId[0];
        // the zip file's source and unzipped file's destination
        let source = `./uploads/${pluginId}.zip`;
        let destination = `${__dirname}/../../uploads/${pluginId}`;

        // unzip
        let fileUnziped =  unzipFile(source, destination, () => {
            console.log("file has been unziped !");
        });

        res.status(200).send({title: 'Uploaded', message: `File ${pluginId} has been uploaded!`});
    });


    // upload the file
    let fileUploaded = fileUpload(req, res, () => {
        console.log(`file has been uploaded !`);
    })
};

module.exports.getFile = (req, res) => {
    //Accepting user input directly is very insecure and should
    //never be allowed in a production app. Sanitize the input.
    let fileName = req.body.filename;
    //Connect to the MongoDB client
    MongoClient.connect(config.DbConfig.DBURL, async function(err, client){
        if(err){
            return res.status(500).send({title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});
        }
        const db = client.db("pws");

        const collection = db.collection('plugins.files');
        const collectionChunks = db.collection('plugins.chunks');


        let result = await collection.findOne({filename: fileName});
        console.log(result);

        let bucket = new MongoClient.GridFSBucket(
            db, {bucketName: "plugins"}
        );
        let downloadStream = bucket.openDownloadStream(ObjectID(result._id));

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });
    });
};