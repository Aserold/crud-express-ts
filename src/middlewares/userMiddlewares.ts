import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .send({error: error.details.map((detail) => detail.message).join(', ')});
  }
  next();
};
