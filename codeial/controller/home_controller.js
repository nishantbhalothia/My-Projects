module.exports.home =(req,res)=>{
    console.log(req.cookies); //reading cookie from browser in console
    res.cookie('nishant',25); //sending cookie to browser
    return res.render('home.ejs',{
        title: 'My Home page',
        desc:'first description rendering using controller and render from view folder home.ejs file'
    })
}