const Validator = require("validator");

const isEmpty = require("./isEmpty");

function registrationInputvalidation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "confirm password field is required";
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be at least 2 charaters and less than 30";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is inavlid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 32 })) {
    errors.password = "password is inavlid, must be upto 6 characters";
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "passwords must match";
  }
  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = registrationInputvalidation;
