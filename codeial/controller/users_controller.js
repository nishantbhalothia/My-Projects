const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile =async (req, res)=>{
    user = await User.findById(req.params.id);
    res.render('user_profile.ejs',{
        title: 'My Profile page',
        desc:'first description rendering using controller and render from view folder profile.ejs file',
        profile_user:user
    })
}
module.exports.update = async (req, res) => {
    if (req.user.id == req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).send('User not found');
        }
  
        User.uploadedAvatar(req, res, (err) => {
          if (err) {
            console.log('Multer Error', err);
          }
  
          user.name = req.body.name;
          user.email = req.body.email;
  
          if (req.file) {
            if (user.avatar) {
              try {
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
              } catch (err) {
                console.log('Error deleting previous avatar', err);
              }
            }
  
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }
  
          user.save();
          return res.redirect('back');
        });
      } catch (err) {
        console.log('Error finding user', err);
        return res.status(500).send('Internal Server Error');
      }
    } else {
      return res.status(401).send('Unauthorized');
    }
  };
  

module.exports.signUp = (req, res)=>{
    // if user is already signed-up then redirect to profile page
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    };
    res.render('sign_in.ejs',{
        title: 'Sign Up page'
    })
}

module.exports.signIn = (req, res)=>{
    // if user is already signed-in then redirect to profile page
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    };
    res.render('sign_in.ejs',{
        title: 'Sign In page'
    })
}





// =============================================================================================================
// get to the signup data
// user is created in database and redirect to sign in page if user already exist then redirect to sign in page
// =============================================================================================================
module.exports.create = async (req, res)=>{
    req.flash('success', 'You have signed up, login to continue!');
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    let user =await User.findOne({email: req.body.email});
    // if userr already exist then redirect to sign in page
    if(user){
        // return res.redirect('back');
        return res.redirect('/users/sign-in');
    }
    // if user not exist then create user
    await User.create(req.body);
    return res.redirect('/users/sign-in');

}


// module.exports.create = async (req, res)=>{
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email: req.body.email}).exec(function(err, user){
//         if(err){console.log('error in finding user in signing up'); return}

//         if(!user){
//             User.create(req.body);
//             return res.redirect('/users/sign-in');
//         }else{
//             return res.redirect('back');
//         }
//     })

// }


// =============================================================================================================
// sign in and create session for user
// =============================================================================================================
module.exports.createSession= async (req, res)=>{
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/')
}

// ===================sign out  and destroy session===================
// logout and destroy session and redirect to home page
// ===================sign out  and destroy session===================
module.exports.destroySession =async (req, res)=>{
    req.logout((err)=>{if(err){console.log('error in logout',err); return}});
    req.flash('success', 'logged out!');
    return res.redirect('/');
}