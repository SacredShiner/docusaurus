import Validator from "validator";
import isEmpty from "../is-empty.js";

export const validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export const validateRegisterInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password field is required";
    } else if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Password must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};