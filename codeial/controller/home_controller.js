module.exports.home =(req,res)=>{
    return res.render('home.ejs',{
        title: 'My Home page',
        desc:'first description rendering using controller and render from view folder home.ejs file'
    })
}