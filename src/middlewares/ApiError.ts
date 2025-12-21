export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string = "Invalid request data") {
    return new ApiError(400, message);
  }

  static notFound(message: string = "Resource not found") {
    return new ApiError(404, message);
  }

  static internal(message: string = "Internal server error") {
    return new ApiError(500, message);
  }

  static conflict(message:string="Resource already exists"){
    return new ApiError(409,message )
  }
}
