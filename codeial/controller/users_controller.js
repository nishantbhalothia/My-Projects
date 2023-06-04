const User = require('../models/user');


module.exports.profile =async (req, res)=>{
    id = req.cookies.user_id;
    console.log(id);
    user =await User.findById(id);
    if (!user){
        // if user is not found then redirect to home page
        return res.redirect('back');
        // if user is not found then redirect to sign in page
        // return res.redirect('/users/sign-in'); 
    }
    else{
        return res.render('user_profile.ejs', {
            title: 'User Profile',
            desc : 'This is the user profile page',
            user: user
    })
    }

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
    // console.log(existingUser);
    if (!existingUser){
        return res.redirect('back');
    }
    if (existingUser.password != req.body.password){
        return res.redirect('back');
    }
    res.cookie('user_id', existingUser.id);
    // console.log(req.cookies);
    return res.redirect('/users/profile');
    // req.session.user = user;
    
}


module.exports.destroySession =async (req, res)=>{
    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}