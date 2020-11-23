const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// define a schema
const employeeSchema = new mongoose.Schema({
  firstname: {
    type : String,
    required : true
  },
  lastname: {
    type : String,
    required : true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phnum: {
    type : Number,
    required : true
  },
  password: {
    type : String,
    required : true
  },
  cnfpassword: {
    type : String,
    required : true
  }
});

// password ko strong bnane k liye bcrypt ka istemal kaise kare whi hai ye

employeeSchema.pre("save" , async function(next){

  if(this.isModified("password")){
    // const passHash = await bcrypt.hash(password , 10);
    this.password = await bcrypt.hash(this.password , 10);
    console.log(`hash m badal k y hogya mera password ${this.password}`)

    this.cnfpassword = undefined;
    // y undefined wala hume db m cnfpassword wala nhi dikhayege toh kisko ko pta bhi nhi chalega password kya tha....
  }
  next();
})

// compile our model
const Registerform = mongoose.model("Registerform", employeeSchema);
module.exports = Registerform;