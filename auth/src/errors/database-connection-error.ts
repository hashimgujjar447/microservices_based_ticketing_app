import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting with db");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializerError() {
    return [{ message: this.reason }];
  }
}
