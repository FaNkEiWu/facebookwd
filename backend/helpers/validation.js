const User = require("../models/User");

exports.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (text, min, max) => {
  if (text.length > max || text.length < min) {
    return false;
  }
  return true;
};

exports.validateUsername = async (username) => {
  let res = false;

  do {
    let check = await User.findOne({ username });
    if (check) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      res = true;
    } else {
      res = false;
    }
  } while (res);
  return username;
};
