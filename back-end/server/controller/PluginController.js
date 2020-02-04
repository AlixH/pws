const PluginModel = require('../models/Plugin');

module.exports = {
    getById: function(req, res, next) {
        console.log("getPluginById");
        PluginModel.findById(req.params.pluginId, function(err, pluginInfo){
            if (err) {
                console.log("error sa mere");
                console.log(err);
                next(err);
            } else {
                res.json({status:"success", message: "Plugin found!!!", data:{plugins: pluginInfo}});
            }
        });
    },

    getAll: function(req, res, next) {
        console.log("getAllPlugins");
        let pluginsList = [];
        PluginModel.find({}, function(err, plugins){
            if (err){
                next(err);
            } else{
                for (let plugin of plugins) {
                    // pluginsList.push({id: plugin._id, name: plugin.name, description: plugin.description, version: plugin.version, author: plugin.author, updated_on : plugin.updated_on, video_url : plugin.video_url, thumbnail_url: plugin.thumbnail_url, category : plugin.category, opensource : plugin.opensource, tags : plugin.tags, comments: plugin.comments, number_of_ratings: plugin.number_of_ratings, score : plugin.score});
                    pluginsList.push(plugin);
                }
                res.json({status:"success", message: "Plugin list found!!!", data:{plugins: pluginsList}});

            }});
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

    deleteById: function(req, res, next) {
        console.log("deletePluginById");

        PluginModel.findByIdAndRemove(req.params.pluginId, function(err, pluginInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Plugin deleted successfully!!!", data:null});
            }
        });
    },

    create: function(req, res, next) {
        console.log("createPlugin");

        PluginModel.create({ name: req.body.name, description: req.body.description, version: req.body.version, author: req.body.author, updated_on : req.body.updated_on, video_url : req.body.video_url, thumbnail_url: req.body.thumbnail_url, zip_url : req.body.zip_url, category : req.body.category, opensource : req.body.opensource, tags : req.body.tags}, function (err, result) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "Plugin added successfully!!!", data: null});
        });
    },

    /**
     * Rate a plugin given its id
    */
    rate: (req, res, next) => {
        console.log("ratePlugin");
        console.log(req.body.pluginId);
        console.log(req.body.note);

        PluginModel.findByIdAndUpdate(req.body.pluginId, req.body.note, (err, result) => {
            if(err){
                next(err);
            } else{
                res.json({status: "success", message: `Plugin of id: ${req.body.pluginId} successfully rated: ${req.body.note}`, data: null});
            }
        });
    },
};