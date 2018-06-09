const Validator = require("validator");

const isEmpty = require("./isEmpty");

function loginInputvalidation(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "invalid email, please type a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = loginInputvalidation;
