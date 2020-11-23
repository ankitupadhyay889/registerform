const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const bcrypt = require("bcryptjs");
require("./connec");

// **************************************************************************************************************************************************


const { json } = require("express");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ********************************************************************

const Registerform = require("./formdata");
const port = process.env.PORT || 3000;

// ************************************************************************

const static_path = path.join(__dirname, "../public");
// // console.log(path.join(__dirname , "../public"))
app.use(express.static(static_path));
app.set("view engine", "hbs");

// ***************************************************************************************************************************************************

app.get("/", (req, res) => {
  res.render("index");
});



// ***************************************************************************************************************************************************

app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", async(req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usermail = await Registerform.findOne({email:email});

    // hume toh pta hai ki password hash m badal gya hai but isko kaise btaye toh uske liye hume compare krna hoga

    const isMatch = await bcrypt.compare(password , usermail.password);
    
    // if(usermail.password === password){
    if(isMatch){
      res.render("index");
    }else{
      res.send("INVALID LOGIN DETAILS");
    }

  } catch (error) {
    res.send("INVALID LOGIN DETAILS")
  }
});


// ****************************************************************************************************************************************************

app.get("/register", (req, res) => {
  res.render("register");
});

// ab db m save hoga jb register wale page p jake register karenge broo

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.cnfpassword;
    if (password === cpassword) {
      const registerForm = new Registerform({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phnum: req.body.phnum,
        password: password,
        cnfpassword: cpassword,
      });
      const registered = await registerForm.save();
      res.render("index");
    } else {
      res.send("password not match");
    }
  } catch (error) {
    res.send(error);
  }
});


// *****************************************************************************************************************************************************

app.listen(port, () => {
  console.log(`Server is run on ${port}`);
});
