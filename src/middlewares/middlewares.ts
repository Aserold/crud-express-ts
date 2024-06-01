import { Request, Response, NextFunction } from 'express';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request on endpoint "${req.path}"`);
  next();
};

module.exports = requestLogger;
