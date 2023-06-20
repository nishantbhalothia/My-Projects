const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    post =await Post.findById(req.body.post)
    if (post) {
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();
        return res.redirect('back');    
    }
    // await Comment.create({
    //     content: req.body.content,
    //     user: req.user._id
    // });
    // return res.redirect('back');
}


module.exports.destroy = async function (req, res) {
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect('back');
}
