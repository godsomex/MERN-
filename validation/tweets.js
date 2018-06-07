const Validator = require("validator");

const isEmpty = require("./isEmpty");

function tweetInputvalidation(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "email field is required";
  }

  if (!Validator.isLength(data.text, { min: 8, max: 500 })) {
    errors.text = "tweet must be upto 8 characters but must be less than 500";
  }
  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = tweetInputvalidation;
