const Post = require('../models/post');
// const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}