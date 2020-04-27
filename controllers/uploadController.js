const User = require("../models/User");
const Profile = require("../models/Profile");

exports.uploadProfilePicsController = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      let profilePics = `/uploads/${req.file.filenme}`;
      if (profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { profilePics } }
        );
      }

      await user.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { profilePics } }
      );
      res.status(200).json({
        profilePics,
      });
    } catch (e) {
      res.status(500).json({
        profilePics: req.user.profilePics,
      });
    }
  } else {
    res.status(500).json({
      profilePics: req.user.profilePics,
    });
  }
};
