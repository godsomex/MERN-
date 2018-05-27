const Validator = require("validator");

const isEmpty = require("./isEmpty");

function profileInputvalidation(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle =
      "handle needs to be longer than 2 characters and less than 40 characters ";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "handle is required ";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "skills is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid url";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid url";
    }

    if (!isEmpty(data.twitter)) {
      if (!Validator.isURL(data.twitter)) {
        errors.twitter = "Not a valid url";
      }
    }

    if (!isEmpty(data.instagram)) {
      if (!Validator.isURL(data.instagram)) {
        errors.instagram = "Not a valid url";
      }
    }
  }
  //   return { errors, isValid : errors}; // because the isValid key value needs to be a string and not an object as initialized we now created the isEmpty function and imported
  return { errors, isValid: isEmpty(errors) }; // wrap the errors in our created isEmpty function
}

module.exports = profileInputvalidation;
