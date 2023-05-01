import Joi from "joi";

export const signUpValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(5).max(10).alphanum().messages({
        "string.min": "Name must be at least 5 characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Email format invalid",
        "any.required": "email is required",
      }),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
        )
        .messages({
          "string.pattern.base": "password must contains number and symbols",
        }),
      cpass: Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "cpass must match password",
      }),
      age: Joi.number().required().min(18).max(50).messages({
        "number.min": "age must be greater than or equal to 18",
        "any.required": "age is required",
      }),
    }),
};

export const signInValidation = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string().email().required().messages({
        "string.email": "Email format invalid",
        "any.required": "email is required",
      }),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
        )
        .messages({
          "string.pattern.base": "password must contains number and symbols",
        }),
    }),
};

export const validateUpdateUser = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().required().min(5).max(10).alphanum().messages({
        "string.min": "Name must be at least 5 characters",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Email format invalid",
        "any.required": "email is required",
      }),
      password: Joi.string()
        .required()
        .pattern(
          new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)
        )
        .messages({
          "string.pattern.base": "password must contains number and symbols",
        }),
      age: Joi.number().required().min(18).max(50).messages({
        "number.min": "age must be greater than or equal to 18",
        "any.required": "age is required",
      }),
    }),
};
