// eslint-disable-next-line no-unused-vars
function Plugin(pluginId, name, description, video_url, image_url, tags, version, open_source, category, comments, authorId, ratings, score){
    this.pluginId = pluginId;
    this.name = name;
    this.description = description;
    this.video_url = video_url;
    this.image_url = image_url;
    this.tags = tags;
    this.version = version;
    this.open_source = open_source;
    this.category = category;
    this.comments = comments;
    this.authorId =authorId;
    // nb of times the plugin has been rated
    this.ratings = ratings;
    // mean rating
    this.score = score/ratings;
}

module.exports = Plugin;
