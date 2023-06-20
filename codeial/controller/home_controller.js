const Post = require('../models/post'); //importing post model

module.exports.home =async (req,res)=>{
    // console.log(req.cookies); //reading cookie from browser in console
    // res.cookie('nishant',25); //sending cookie to browser
    posts = await Post.find({})
    .populate('user') //populating user in post
    .populate({
        path:'comments', //populating comments in post
        populate:{
            path:'user' //populating user in comments
        }
    });
    return res.render('home.ejs',{
        title: 'My Home page',
        desc:'first description rendering using controller and render from view folder home.ejs file',
        posts:posts
    })
}