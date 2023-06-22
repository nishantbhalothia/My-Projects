const Post = require("../models/post"); // importing post model
const User = require("../models/user"); // importing user model

module.exports.home = async (req, res) => {
  try {
    // console.log(req.cookies); // reading cookie from browser in console
    // res.cookie('nishant',25); // sending cookie to browser
    const posts = await Post.find({})
      .populate("user") // populating user in post
      .populate({
        path: "comments", // populating comments in post
        populate: {
          path: "user", // populating user in comments
        },
      });

    const users = await User.find({}); // finding all users

    return res.render("home.ejs", {
      title: "My Home page",
      desc: "first description rendering using controller and render from view folder home.ejs file",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.error(err);
    // Handle the error appropriately
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
