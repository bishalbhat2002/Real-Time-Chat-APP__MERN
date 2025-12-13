
class ErrorHandler extends Error{
     constructor(message, statusCode){
          super(message);
          this.statusCode = statusCode;
          Error.captureStackTrace(this, this.constructor);
     }
}


export const errorHandler = ErrorHandler;

// Its a class, so while using errorHandler -> we must use 'new errorHandler(message, statuscode)' 