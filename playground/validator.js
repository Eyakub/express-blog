const router = require("express").Router();
const { check, validationResult } = require("express-validator");

router.get("/validator", (req, res, nex) => {
  res.render("playground/signup", { title: "Validator playground" });
});
router.post(
  "/validator",
  [
    check("username")
      .not()
      .isEmpty()
      .withMessage("Username cant be empty")
      .isLength({ max: 15 })
      .withMessage(`Username can't be greater than 15 character`)
      .trim(),
    check("email")
      .isEmail()
      .withMessage(`Please provide a valid email`)
      .normalizeEmail(),
    check("password").custom((value) => {
      if (value.length < 5) {
        throw new Error("Password must be greater than 5 characters");
      }
      return true;
    }),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesnt match");
      }
    }),
  ],
  (req, res, nex) => {
    let errors = validationResult(req);

    const formatter = (error) => error.msg;
    console.log(errors.formatWith(formatter).mapped());

    // console.log(errors.array());
    // console.log(errors.mapped());
    // console.log(errors.isEmpty());
    console.log(req.body.username, req.body.email)
    res.render("playground/signup", { title: "Validator playground" });
  }
);
module.exports = router;
