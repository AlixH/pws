const Plugin = require('../models/Plugin');

module.exports = {
    getById: function (req, res, next) {
        console.log("getPluginById");
        Plugin.findById(req.params.pluginId, function (err, pluginInfo) {
            if (err) {
                console.log("error sa mere");
                console.log(err);
                next(err);
            } else {
                res.json({status: "success", message: "Plugin found!!!", data: {plugins: pluginInfo}});
            }
        });
    },

    getAll: function (req, res, next) {
        console.log("getAllPlugins");
        let pluginsList = [];
        Plugin.find({}, function (err, plugins) {
            if (err) {
                next(err);
            } else {
                for (let plugin of plugins) {
                    pluginsList.push(plugin);
                }

                console.log({plugins: pluginsList});
                res.json({status: "success", message: "Plugin list found!!!", data: {plugins: pluginsList}});

            }
        });
    },

    /*
    updateById: function(req, res, next) {
        PluginModel.findByIdAndUpdate(req.params.pluginId, {name: req.body.name}, function(err, movieInfo){if(err)
            next(err);
        else {
            res.json({status:"success", message: "Plugin updated successfully!!!", data:null});
        }
        });
    },*/

    deleteById: function (req, res, next) {
        console.log("deletePluginById");

        Plugin.findByIdAndRemove(req.params.pluginId, function (err, pluginInfo) {
            if (err)
                next(err);
            else {
                res.json({status: "success", message: "Plugin deleted successfully!!!", data: null});
            }
        });
    },

    create: function (req, res, next) {
        console.log("createPlugin");


        Plugin.create({
            name: req.body.name, description: req.body.description, version: req.body.version,
            author: req.body.author, updated_on: req.body.updated_on, video_url: req.body.video_url,
            thumbnail_url: req.body.thumbnail_url, zip_url: req.body.zip_url, category: req.body.category,
            opensource: req.body.opensource, tags: req.body.tags
        }, function (err, result) {
            if (err)
                next(err);
            else
                console.log(result);
                res.json({status: "success", message: "Plugin added successfully!!!", data: {pluginId : result._id}});
        });
    },

    /**
     * Add rating to one plugin's rating list
     */
    rate: (req, res, next) => {
        console.log(">>> rate plugin <<<");

        let pluginId = req.body.pluginId;
        let note = parseInt(req.body.note);

        /**
         * Reminder:
         ** Plugin.findOne{filter} returns one single plugin that matches the filter
         ** Plugin.find{filter} returns a list containing one single plugin that matches the filter
         */
        Plugin.findOne({_id: pluginId}, (err, plugin) => {
            if (err) {
                next(err);
            } else {
                let newRatings = plugin.ratings;
                newRatings.push(note);
                Plugin.updateOne({_id: plugin._id}, {ratings: newRatings}, (error, p) => {
                    if (error) {
                        next(error);
                    } else {
                        res.json({
                            status: "Success",
                            message: `Plugin ${plugin.name} has been rated ${note}`,
                            data: null
                        });
                    }
                });
            }
        });
    },

    /**
     * Get plugin's score
     */
    getScore: (req, res, next) => {
        console.log(">>> getScore <<<");

        let pluginId = req.body.pluginId;

        Plugin.findOne({_id: pluginId}, (err, plugin) => {
            if (err) {
                next(err);
            } else {
                let ratings = plugin.ratings;
                let score = 0;

                if (ratings.length > 0) {
                    /**
                     * Sum all the ratings into score
                     */
                    //score = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                    score = computeScore(ratings);
                }
                res.json({status: "Success", data: {score: score}});
            }
        });
    },

    computeScore : (listNotes) => {
        let result = listNotes.reduce((a, b) => a + b, 0) / listNotes.length;   
        return result;
    },


    /**
     * Get plugin's score
     */
    comment: (req, res, next) => {
        console.log(">>> comment <<<");

        let pluginId = req.body.pluginId;
        let commentText = req.body.commentText;

        Plugin.findOne({_id: pluginId}, (err, plugin) => {
            if (err) {
                next(err);
            } else {
                let comments = plugin.comments;
                comments.push(commentText);
                Plugin.updateOne({_id: plugin._id}, {comments: comments}, (error, p) => {
                    if (error) {
                        next(error);
                    } else {
                        res.json({
                            status: "Success",
                            message: `Comment ${commentText} has been added to plugin ${plugin.name}`,
                            data: null
                        });
                    }
                });
            }
        });
    },

    /**
     * Get Zip File by pluginId
     */
    getZipFile: (req, res, next) => {
        console.log(">>> commentgetZipFile <<<");

        let pluginId = req.query.pluginId;

        Plugin.findOne({_id: pluginId}, (err, plugin) => {
            if (err) {
                next(err);
            } else {
                try {
                    const file = `${__dirname}/../../uploads/${pluginId}.zip`;
                    res.download(file);
                } catch (error) {
                    res.json({status: "Error", message: "404 - File not Available"});
                }
            }
        });
    },
};



/**
 * Echapper les caractères spéciaux HTML
 */
let escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};