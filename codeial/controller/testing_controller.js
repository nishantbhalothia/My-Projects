module.exports.testing = (req, res) => {
    return res.render('testing.ejs', {
        title: 'My testing page',
        desc: 'first description rendering using controller and render from view folder testing.ejs file'
    });
};