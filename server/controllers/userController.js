// /controllers/userController.js
const { User, generatePIN, generateAccountNumber } = require("../models/User");

const signup = async (req, res) => {
  console.log("Signup function called");
  console.log("Request body:", req.body);
  try {
    const { fullname, email, tel, password, image } = req.body;

    // Validate request data
    if (!fullname || !email || !tel || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Generate unique PIN and account number for the user
    const pin = await generatePIN();
    const accountNumber = await generateAccountNumber();

    // Create a new user instance
    const newUser = new User({
      fullname,
      email,
      tel,
      password,
      image,
      pin,
      accountNumber,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return response with user data (excluding sensitive information)
    res.status(201).json({
      message: "User created successfully",
      user: {
        fullname: savedUser.fullname,
        email: savedUser.email,
        tel: savedUser.tel,
        pin: savedUser.pin,
        accountNumber: savedUser.accountNumber,
        currentBalance: savedUser.currentBalance,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = { signup };
