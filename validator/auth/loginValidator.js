const { body } = require("express-validator");

const loginValidator = [
  body("email").not().isEmpty().withMessage("Email cant be empty"),
  body("password").not().isEmpty().withMessage("Password cant be empty"),
];

module.exports = loginValidator