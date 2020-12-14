const User = require("../models/user");

exports.signUp = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (user) throw new Error("User already exists");

    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    console.log("User Added!");
    res.status(200).send("User Added!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (!user) throw new Error("User not found");

    const match = await user.comparePassword(req.body.password);
    if (!match) throw new Error("Invalid Credentials");

    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).exec();

    if (!user) throw new Error("User not found");

    const match = await user.comparePassword(req.body.currentPassword);
    if (!match) throw new Error("Invalid Credentials");

    user.password = req.body.newPassword;
    await user.save();

    console.log("Password Updated");
    res.status(200).send("Password Updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
