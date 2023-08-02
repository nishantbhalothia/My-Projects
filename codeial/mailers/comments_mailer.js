const nodeMailer = require('../config/nodemailer');
// because we populate the comment with user and post so we can access post user ,like this => comment.post.user.email

// this is another way of exporting a method
exports.newComment = (comment) => {
    // console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');
    nodeMailer.transporter.sendMail({
        from: 'nishant.bhalothia1@gmail.com',
        to: comment.post.user.email, // if we want to send it to the post user then comment.post.user.email else comment.user.email
        subject: 'New Comment Published!',
        html: htmlString,
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        // console.log('Message sent', info);
        return;
    });
}