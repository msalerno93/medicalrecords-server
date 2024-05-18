const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt")


//CREATE NEW USER WITH HASHING PASSWORD
const createUser = async (req, res) => {
const {email, password, firstName, lastName} = req.body
    try {
        const existingUser = await User.findOne({email});
        console.log(req.body.email);
        if(existingUser){
            res.status(500).send("User already exists!")
        }else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
        
            const newUser = new User({ email, password: hashedPassword, firstName, lastName });
            await newUser.save();
            res.status(201).json(`${email} created successfully!`);
        }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Unable to create User" });
    }
  };


  //SIGN IN WITH ALREADY CREATED USER

  const signInUser = async(req, res) => {

  }

  module.exports = {
    createUser
  }