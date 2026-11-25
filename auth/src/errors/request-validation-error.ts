import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

interface CustomErrorI {
  statusCode: number;
  serializerError(): {
    message: string;
    field?: string;
  }[];
}

export class RequestValidationError
  extends CustomError
  implements CustomErrorI
{
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializerError() {
    return this.errors.map((err) => {
      return { message: err.msg };
    });
  }
}
