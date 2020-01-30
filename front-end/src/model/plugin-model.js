// eslint-disable-next-line no-unused-vars
function Plugin(pId, name, description, videoUrl, imageUrl, tags, version, open_source, category, comments, authorId, nb_ratings, total_score ){
    this.pId = pId;
    this.name = name;
    this.description = description;
    this.videoUrl = videoUrl;
    this.imageUrl = imageUrl;
    this.tags = tags;
    this.version = version;
    this.open_source = open_source;
    this.category = category;
    this.comments = comments;
    this.authorId =authorId;
    // nb of times the plugin has been rated
    this.nb_ratings = nb_ratings;
    // mean rating
    this.score = total_score/nb_ratings;
}

module.exports = Plugin;
