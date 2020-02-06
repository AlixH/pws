const Plugin = require('../models/Plugin');

module.exports = {
    getById: function(req, res, next) {
        console.log("getPluginById");
        Plugin.findById(req.params.pluginId, function(err, pluginInfo){
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
        Plugin.find({}, function(err, plugins){
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

        Plugin.findByIdAndRemove(req.params.pluginId, function(err, pluginInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Plugin deleted successfully!!!", data:null});
            }
        });
    },

    create: function(req, res, next) {
        console.log("createPlugin");

        Plugin.create({ name: req.body.name, description: req.body.description, version: req.body.version, author: req.body.author, updated_on : req.body.updated_on, video_url : req.body.video_url, thumbnail_url: req.body.thumbnail_url, zip_url : req.body.zip_url, category : req.body.category, opensource : req.body.opensource, tags : req.body.tags}, function (err, result) {
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
        console.log(">>> rate <<<");
        let pluginId = req.body.pluginId;
        let note = req.body.note;
        let plugin = null;
        /**
         * Plugin.findOne{filter} return one single plugin that matches the filter
         * Plugin.find{filter} return a a list containing one single plugin that matches the filter
        */
        Plugin.findOne({_id: "5e32af3e41e3a3001006784c"}, (err, p) => {
            if(err){
                next(err);
            } else{
                Plugin.updateOne({_id: p._id}, {ratings: p.ratings.push(note)});
                res.json({status: "Log", message: "Logging", data: p});
            }
        });
    }
};