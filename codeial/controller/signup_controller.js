module.exports.signUp = (req, res) => {
    return res.render('user_sign_up.ejs', {
        title: 'Codeial | Sign Up',
        desc: 'first description rendering using controller and render from view folder sign_up.ejs file'
    })
}