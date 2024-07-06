import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(128).required(),
  age: Joi.number().positive().min(1).required(),
});
