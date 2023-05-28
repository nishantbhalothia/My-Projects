module.exports.profile = (req, res)=>{
    res.render('user_profile.ejs',{
        title: 'My Profile page',
        desc:'first description rendering using controller and render from view folder profile.ejs file'
    })
}