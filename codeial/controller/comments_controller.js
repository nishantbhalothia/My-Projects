const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comments_email_worker');
const Like = require('../models/like');


module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });

        post.comments.push(comment);
        await post.save();

        comment.user = req.user;

         // this will send the mail to the user who has commented on the post
        // commentsMailer.newComment(comment);
        // this part is hadel by the worker
        let job = queue.create('emails', comment).save(function(err){
            if (err){
                console.log('error in creating a queue', err);
                return;
            }
            console.log('job enqueued', job.id);
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Comment created!"
            });
        }

        req.flash('success', 'Comment published!');
        return res.redirect('back');
    } catch (err) {
        console.error("Error creating comment:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};



module.exports.destroy = async function (req, res) {
    comment =await Comment.findById(req.params.id);
    if (comment.user == req.user.id) {
        let postId = comment.post;
        comment.deleteOne();

        if (req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message: "Comment deleted"
            });
        };


        let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}
