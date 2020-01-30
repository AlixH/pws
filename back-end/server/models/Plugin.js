const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;const PluginSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    version: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    video_url: {
        type: String,
        trim: true,
        required: true
    },
    thumbnail_url: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    opensource: {
        type: Boolean,
        required: true
    },

    tags: [{
        type: String,
        trim: true,
        default: []
    }],
    comments: [{
        type: String,
        trim: true,
        default: []
    }],

    ratings: [{
        type: Number,
        trim: true,
        default: []
    }]
});

module.exports = mongoose.model('Plugin', PluginSchema);