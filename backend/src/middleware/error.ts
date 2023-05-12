import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set a default error message and status code
  let message = "Internal server error";
  let statusCode = 500;

  // Check if the error is a known type and set the appropriate message and status code
  if (err instanceof SyntaxError) {
    message = "Invalid JSON";
    statusCode = 400;
  } else if (err.name === "MongoError" && err.code === 11000) {
    message = "Duplicate key error";
    statusCode = 409;
  } else if (err.name === "ValidationError") {
    message = err.message;
    statusCode = 400;
  } else if (err instanceof PrismaClientKnownRequestError) {
    message = err.message;
    statusCode = 400;
  }

  // Send the error response to the client
  res.status(statusCode).json({
    error: {
      message: message,
    },
  });
};

export default errorHandler;

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  // Do any necessary cleanup and exit the process
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  // Do any necessary cleanup and exit the process
  process.exit(1);
});
