const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      birthYear,
      birthMonth,
      birthDay,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "The emails address already existed. Try a new one.",
      });
    }

    if (!validateLength(first_name, 3, 20)) {
      return res.status(400).json({
        message: "First name must be between 3 to 20 characters.",
      });
    }

    if (!validateLength(last_name, 3, 20)) {
      return res.status(400).json({
        message: "last name must be between 6 to 40 characters.",
      });
    }

    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be between 6 to 40 characters.",
      });
    }

    const crytedPassword = await bcrypt.hash(password, 12);

    let tempUsername = await validateUsername(first_name + last_name);

    const user = await new User({
      first_name,
      last_name,
      username: tempUsername,
      email,
      password: crytedPassword,
      gender,
      birthYear,
      birthMonth,
      birthDay,
    }).save();

    const emailVarificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    console.log(emailVarificationToken);

    res.json(user);
  } catch (err) {
    res.status(500).json({ ErrorMessage: err.message });
  }
};
