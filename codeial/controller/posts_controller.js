const Post = require('../models/post');
// const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
}

module.exports.destroy = async function(req, res){
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('back');
}