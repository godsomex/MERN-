const Validator = require("validator");

const isEmpty = require("./isEmpty");

function academicsInputvalidation(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.school = !isEmpty(data.discipline) ? data.discipline : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  if (Validator.isEmpty(data.discipline)) {
    errors.discipline = "discipline field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from field is required";
  }

  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = academicsInputvalidation;
