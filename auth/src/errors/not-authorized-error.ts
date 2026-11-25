import { CustomError } from "./custom-error";

export class NotAuthorizeError extends CustomError {
  statusCode = 401;
  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }
  serializerError() {
    return [{ message: "Not authorized" }];
  }
}
