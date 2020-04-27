const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");

exports.dashboardGetController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        title: "Dashboard",
        flashMessage: Flash.getMessage(req),
      });
    }

    res.redirect('/dashboard/create-profile')
  } catch (e) {
    next(e);
  }
};

exports.createProfileGetController = async (req, res, next) => {
  try{
    let profile = await Profile.findOne({user: req.user._id})
    if(profile){
      res.redirect('/dashboard/edit-profile')
    }
    res.render('pages/dashboard/create-profile', {title: 'Create Profile', flashMessage: {}})
  } catch(e){
    next(e)
  }
}

exports.createProfilePostController = (req, res, next) => {
  next()
}

exports.editProfileGetController = (req, res, next) => {
  next()
}

exports.editProfilePostController = (req, res, next) => {
  next()
}