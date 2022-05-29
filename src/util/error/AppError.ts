import { HttpCode } from "../HttpCode";

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly message: string;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpCode, message: string, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.message = message;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
