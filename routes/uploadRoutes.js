const router = require("express").Router();
const { isAuthenticated } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  uploadProfilePicsController,
} = require("../controllers/uploadController");

router.post(
  "/profilePics",
  isAuthenticated,
  upload.single("profilePics"),
  uploadProfilePicsController
);
