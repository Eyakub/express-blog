const router = require("express").Router();
const { body } = require("express-validator");
const User = require("../models/User");

const {
  signupGetController,
  signupPostController,
  loginGetController,
  loginPostController,
  logoutController,
} = require("../controllers/authController");

const signupValidator = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username must be between 2 to 15 character")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("Username already exist");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("Please a provide a valid email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already exist");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password should be more than 5 character"),
  body('confirmPassword').custom((confirmPassword, {req}) => {
    if(confirmPassword !== req.body.password){
      throw new Error('Confirm password mismatch')
    }
    return true
  })
];

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.get("/logout", logoutController);

module.exports = router;
