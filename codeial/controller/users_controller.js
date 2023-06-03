const User = require('../models/user');


module.exports.profile = (req, res)=>{
    res.render('user_profile.ejs',{
        title: 'My Profile page',
        desc:'first description rendering using controller and render from view folder profile.ejs file'
    })
}

module.exports.signUp = (req, res)=>{
    res.render('sign_in.ejs',{
        title: 'Sign Up page'
    })
}

module.exports.signIn = (req, res)=>{
    res.render('sign_in.ejs',{
        title: 'Sign In page'
    })
}






// get to the signup data
// user can create a new account



module.exports.create = async (req, res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    user =await User.create(req.body);
    if (!user){
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');

}



// sign in and create a session for the user
module.exports.createSession =async (req, res)=>{
    existingUser =await User.findOne({email:req.body.email});
    console.log(existingUser);
    if (!existingUser){
        return res.redirect('back');
    }
    if (existingUser.password != req.body.password){
        return res.redirect('back');
    }
    return res.redirect('/users/profile');
    // req.session.user = user;
    
}