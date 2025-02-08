// Project: Open Indoor Maps
// File: src/utils/apiError.ts

// Error class to handle API errors
export class ApiError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, ApiError.prototype);
    }
  }