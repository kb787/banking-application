const bcrypt = require("bcryptjs");
const User = require("./../models/user-model");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { request } = require("express");
const { Op } = require("sequelize");

registerValidationRules = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscore"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must include uppercase, lowercase, number, and special character"
    ),
];

const handleCustomerRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation errors",
      success: false,
    });
  }
  try {
    const {
      user_name,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      user_type = "customer",
      date_of_birth,
      address,
    } = req.body;
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ user_name: user_name }, { email: email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      user_name: user_name,
      email: email,
      password: hashedPassword,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      user_type: user_type,
      address: address,
    });
    const accessToken = newUser.generateAccessToken();
    newUser.access_token = accessToken;
    await newUser.save();
    const userResponse = {
      user_id: newUser.user_id,
      user_name: newUser.user_name,
      email: newUser.email,
      access_token: accessToken,
      user_type: "customer",
    };

    res.status(201).json({
      message: "User registered successfully",
      body: userResponse,
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: `Server error during registration ${error}`,
      success: false,
    });
  }
};

const handleCustomerLogin = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
      return res
        .status(400)
        .json({ message: "Entering all fields is mandatory", success: false });
    }

    let prevUser = await User.findOne({
      where: { user_name },
    });

    if (!prevUser) {
      return res
        .status(404)
        .json({ message: "No such user found", success: false });
    }

    let isMatching = false;
    if (
      prevUser.password.startsWith("$2a$") ||
      prevUser.password.startsWith("$2b$")
    ) {
      isMatching = await bcryptjs.compare(password, prevUser.password);
    } else {
      isMatching = password === prevUser.password;
    }

    if (!isMatching) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", success: false });
    }
    const access_token = prevUser.generateAccessToken();
    prevUser.access_token = access_token;
    await prevUser.save();

    return res.status(202).json({
      message: "Login successful",
      success: true,
      user_id: prevUser.user_id,
      data: access_token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ message: `An error occurred: ${error.message}`, success: false });
  }
};

const handleBankerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const banker_email = process.env.banker_email;
    const banker_password = process.env.banker_password;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Entering all fields is manadatory", success: false });
    } else if (email !== banker_email) {
      return res
        .status(401)
        .json({ message: "Invalid credentials for banker", success: false });
    } else if (email === banker_email && password !== banker_password) {
      return res
        .status(401)
        .json({ message: "Invalid credentials for banker", success: false });
    } else {
      return res
        .status(202)
        .json({ message: "Successfully logged in as a banker", success: true });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `An error ${error} occured`, success: false });
  }
};

module.exports = {
  handleCustomerRegister,
  handleCustomerLogin,
  handleBankerLogin,
};
