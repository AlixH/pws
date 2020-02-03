const MongoClient = require('mongodb');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const jwt = require('jsonwebtoken');
const config = require('../config');
let storage = new GridFsStorage({
    url:  config.DbConfig.DBURL,
    file: (req, file) => {
        return {
            bucketName: 'plugins',       //Setting collection name, default name is fs
            filename: file.originalname     //Setting file name to original name of file
        }
    }
});

let upload = null;

storage.on('connection', (db) => {
    //Setting up upload for a single file
    console.log("storage.on.connection");
    upload = multer({
        storage: storage
    }).single('file1');

});

module.exports.uploadFile = (req, res) => {
    console.log("uploadFile");
    upload(req, res, (err) => {
        if(err){
            console.log(err);
            return res.status(500).send({title: 'Uploaded Error', message: 'File could not be uploaded', error: err});
        }
        console.log("req " + req);
        console.log("req " + req.file);
        console.log("req " + req.file.filename);
        res.status(200).send({title: 'Uploaded', message: `File ${req.file.filename} has been uploaded!`});
    });
};

module.exports.getFile = (req, res) => {
    //Accepting user input directly is very insecure and should
    //never be allowed in a production app. Sanitize the input.
    let fileName = req.body.text1;
    //Connect to the MongoDB client
    MongoClient.connect(config.DbConfig.DBURL, function(err, client){
        if(err){
            return res.status(500).send({title: 'Uploaded Error', message: 'MongoClient Connection error', error: err.errMsg});
        }
        const db = client.db("pws");

        const collection = db.collection('plugins.files');
        const collectionChunks = db.collection('plugins.chunks');
        collection.find({filename: fileName}).toArray(function(err, docs){
            if(err){
                return res.status(200).send({title: 'File error', message: 'Error finding file', error: err.errMsg});
            }
            if(!docs || docs.length === 0){
                return res.status(200).send({title: 'Download Error', message: 'No file found'});
            }else{
                //Retrieving the chunks from the db
                collectionChunks.find({files_id : docs[0]._id}).sort({n: 1}).toArray(function(err, chunks){
                    if(err){
                        return res.status(500).send({title: 'Download Error', message: 'Error retrieving chunks', error: err.errmsg});
                    }
                    if(!chunks || chunks.length === 0){
                        //No data found
                        return res.status(500).send({title: 'Download Error', message: 'No data found'});
                    }
                    //Append Chunks
                    let fileData = [];
                    for(let i=0; i<chunks.length;i++){
                        //This is in Binary JSON or BSON format, which is stored
                        //in fileData array in base64 endocoded string format
                        fileData.push(chunks[i].data.toString('base64'));
                    }
                    //Display the chunks using the data URI format
                    let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');
                    res.status(200).send({title: 'Image File', message: 'Image loaded from MongoDB GridFS', imgurl: finalFile});
                });
            }

        });
    });
};