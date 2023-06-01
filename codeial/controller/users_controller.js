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



module.exports.create = async (req, res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    await User.create(req.body);
    return res.redirect('/users/sign-in');

}


// module.exports.create = async (req, res)=>{
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email: req.body.email}, (err, user)=>{
//         if(err){
//             console.log('error in finding user in signing up');
//             return;
//         }
//         if(!user){
//             User.create(req.body, (err, user)=>{
//                 if(err){
//                     console.log('error in creating user while signing up');
//                     return;
//                 }
//                 return res.redirect('/users/sign-in');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     })
// }