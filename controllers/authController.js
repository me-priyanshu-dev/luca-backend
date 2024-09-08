const user = require("../models/userModel");
const { generateToken } = require("../services/generateToken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { username, name, email, password } = req.body;

  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const saveUser = await user.create({
      username,
      name,
      email,
      password: hashedPass,
    });

    const token = generateToken(saveUser._id);

    res.status(200).json({
      message: "Account created successfully!",
      _id: saveUser._id,
      username: saveUser.username,
      name: saveUser.name,
      email: saveUser.email,
      password: saveUser.password,
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };
