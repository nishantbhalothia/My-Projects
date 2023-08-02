const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const twilio = require("twilio");

require('dotenv').config();

module.exports.profile = async (req, res) => {
  user = await User.findById(req.params.id);
  res.render("user_profile.ejs", {
    title: "My Profile page",
    desc: "first description rendering using controller and render from view folder profile.ejs file",
    profile_user: user,
  });
};
module.exports.update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      User.uploadedAvatar(req, res, (err) => {
        if (err) {
          console.log("Multer Error", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            try {
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            } catch (err) {
              console.log("Error deleting previous avatar", err);
            }
          }

          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      console.log("Error finding user", err);
      return res.status(500).send("Internal Server Error");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports.signUp = (req, res) => {
  // if user is already signed-up then redirect to profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("sign_up.ejs", {
    title: "Sign Up page",
  });
};

module.exports.signIn = (req, res) => {
  // if user is already signed-in then redirect to profile page
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  res.render("sign_in.ejs", {
    title: "Sign In page",
  });
};

// =============================================================================================================
// get to the signup data
// user is created in database and redirect to sign in page if user already exist then redirect to sign in page
// =============================================================================================================
module.exports.create = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect("back");
    }

    let userByEmail = await User.findOne({ email: req.body.email }); // stored email as email in database
    let userByPhone = await User.findOne({ phone: req.body.phone }); // stored phone number as phone in database

    if (userByEmail || userByPhone) {
      req.flash("error", "User already exist");
      return res.redirect("/users/sign-in");
    }

    // If user not exist, then create user
    await User.create(req.body);
    req.flash("success", "You have signed up, login to continue!");
    return res.redirect("/users/sign-in");
  } catch (error) {
    console.error(error); // You can handle the error as needed (logging, sending error responses, etc.)
    return res.status(500).send("Internal Server Error"); // Example error response
  }
};

// =============================================================================================================
// sign in and create session for user
// =============================================================================================================
module.exports.createSession = async (req, res) => {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

// ===================sign out  and destroy session===================
// logout and destroy session and redirect to home page
// ===================sign out  and destroy session===================
module.exports.destroySession = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("error in logout", err);
      return;
    }
  });
  req.flash("success", "logged out!");
  return res.redirect("/");
};

// =============================================================================================================
// =========================== sending otp to user =============================================================
// =============================================================================================================
module.exports.sendOtp=async(req, res) => {
  const otpStorage = {};

  try {
      const phone = req.body.phone;

      // Check if an OTP was sent within the last X seconds (e.g., 60 seconds)
      const now = Date.now();
      const lastOtpTime = otpStorage[phone]?.timestamp || 0; // Default to 0 if not found
      if (now - lastOtpTime < 60000) { // Adjust the time interval as needed
          return res.status(400).json({ message: 'OTP already sent. Please wait before sending another.' });
      }

      // Find the user by phone number
      const user = await User.findOne({ phone });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number

      // Store OTP and timestamp with expiration
      otpStorage[phone] = {
          otp,
          timestamp: now,
      };

      // Send OTP using Twilio
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      await client.messages.create({
          body: "Your OTP is " + otp + ". Valid for 5 minutes. Do not share this with anyone. ",
          to: '+91' + user.phone,
          from: process.env.TWILIO_NUMBER,
      }).then((message) => console.log(message.sid));
      console.log(`Sending OTP ${otp} to phone number ${user.phone}`);

      // Respond with success
      res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
      // Handle error and respond with an error message
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Error sending OTP' });
  }


// Set a timer to clear expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const phone in otpStorage) {
      if (now - otpStorage[phone].timestamp > 300000) { // 5 minutes in milliseconds
          delete otpStorage[phone];
      }
  }
}, 300000); // 5 minutes in milliseconds
console.log(otpStorage)
};