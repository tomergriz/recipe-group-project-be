import Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
const ajv = new Ajv();

const validateBody = (schema: Object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const valid = ajv.validate(schema, req.body);
      if (!valid) {
        res.status(400).send('Incorrect Body');
        return;
      }
    } catch (error) {
      console.error(error);
    }
    next();
  };
};

export default validateBody;
