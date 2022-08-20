const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//test in browser
// router.get("/register",async (req,res)=>{
//   const user = await new User({
//        username:"elon musk",
//        email:"tempmail@gmal.com",
//        mobile:"+917626236363",
//        gender:"male",
//        password:"123454"
//   })
//   await user.save();
//   res.send("helloooooo")
// });
//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      name:req.body.name,
      username: req.body.username,
      email: req.body.email,
      mobile:req.body.mobile,
      gender:req.body.gender,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
