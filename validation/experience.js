const Validator = require("validator");

const isEmpty = require("./isEmpty");

function experienceInputvalidation(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.organisation = !isEmpty(data.organisation) ? data.organisation : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }

  if (Validator.isEmpty(data.organisation)) {
    errors.organisation = "org field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "location field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = experienceInputvalidation;
