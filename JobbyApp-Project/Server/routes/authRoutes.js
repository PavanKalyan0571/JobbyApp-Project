const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../middleware/jwtAuth");
const jobbyUsers = require("../models/jobbyUsers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("This is Authentication Router Page")
});

//singup api
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phoneNumber, gender, password } = req.body;

    const isUserExist = await jobbyUsers.findOne({ email: email });

    if (!isUserExist) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new jobbyUsers({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        password: hashedPassword,
      });

      await user.save(); // Use await here to ensure the user is saved before responding.

      return res.status(201).json({ message: "Registration Success" });
    } else {
      return res.status(400).json({ message: "User Already Registered with this mail Id" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Login api
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserExist = await jobbyUsers.findOne({ email: email });
    if (isUserExist) {

      const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

      if (isPasswordMatched) {

        const payload = {
          id: isUserExist._id
        }

        let token = jwt.sign(payload, 'Pavan', { expiresIn: '24hr' })
        console.log(token);
        return res.status(200).json({ message: "Login Success", token: token });
      }
      else {
        return res.status(401).json({ message: "Password Not Matched" });
      }
    }
    else {
      return res.status(400).json({ message: "User Email Not Found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server error" });
  }
});

//Profile api
router.get("/user-profile", jwtAuth, async (req, res) => {
  console.log(req.id);
  const user = await jobbyUsers.findOne({ _id: req.id })
  console.log(user);
  res.json({ userDetails: user })
});

router.get("/greeting", jwtAuth, async (req, res) => {
  res.send("Hello Welcome Jobby App");
});

module.exports = router;