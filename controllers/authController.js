const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const errorFormatter = require("../utils/validationErrorFormatter");

exports.signupGetController = (req, res, next) => {
  res.render("pages/auth/signup", { title: "Create a new Account", error: {} });
};

exports.signupPostController = async (req, res, next) => {
  let { username, email, password } = req.body;
  let errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return res.render("pages/auth/signup", {
      title: "Create a new account",
      error: errors.mapped(),
      value: {
        username,
        email,
        password,
      },
    });
  }

  try {
    // 11 means times of encryption
    let hashedPassword = await bcrypt.hash(password, 11);

    let user = new User({
      username,
      email,
      password: hashedPassword,
    });

    let createdUser = await user.save(); // return promise and store it to createdUser
    console.log("User created successfully", createdUser);
    res.render("pages/auth/signup", {
      title: "Create a new Account",
      error: {},
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.loginGetController = (req, res, next) => {
  res.render("pages/auth/login", { title: "Login" });
};
exports.loginPostController = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "Invalid Credential",
      });
    }

    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({
        message: "Invalid credential",
      });
    }
    console.log("Successfully logged in", user);
    res.render("pages/auth/login", { title: "Login" });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

exports.logoutController = (req, res, next) => {};
