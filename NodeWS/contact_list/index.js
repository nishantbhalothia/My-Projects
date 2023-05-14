const express = require("express");
const path = require("path");
const port = 8000;

var data = require('./data.json')
const products = JSON.stringify(data.products);


const db= require('./config/mongoose');
const Contact = require('./models/contact');
const { json } = require("body-parser");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded()); //it provide us access to data which is sent to us using post method
app.use(express.static("assets"));  // add assets folder using express.static



// middleware1
app.use(function (req, res, next) {
  next();
});
// middleware2
app.use(function (req, res, next) {
  next();
});


// ====================================================
// user contact data hard coded
// ====================================================
// var contactList = [
//   {
//     name: "Nishant Bhalothia",
//     phone: "1111111111",
//   },
//   {
//     name: "Tony Stark",
//     phone: "1234567890",
//   },
//   {
//     name: "Coding Ninjas",
//     phone: "1234567890",
//   },
// ];

// ====================================================
// refer to home page , user will get home page
// ====================================================

app.get("/", async function (req, res) {
  let contactList = await Contact.find({})
  

  return res.render("home", {
    title: "My Contact List",
    contact_list: contactList,
  });
});

// ====================================================
// refer to practice page , user will get practice page
// ====================================================
app.get("/practice", function (req, res) {
  return res.render("practice", { title: "Lets us play with EJS" });
});


app.get('/products', (req, res)=>{
  return res.end(products)
})

// ====================================================
// create contact and append to contactList
// ====================================================
app.post("/create-contact", function (req, res) {
  // contactList.push( {name: req.body.name  ,  phone: req.body.phone });
  // contactList.push(req.body);

  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  })
  return res.redirect("back");
});


// ====================================================
// contact delete secton
// ====================================================
app.get('/delete-contact/',async (req, res)=>{
  let id = req.query.id;
  let contactId = await Contact.findByIdAndDelete(id);
  return res.redirect('back')
  
})

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
