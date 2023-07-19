import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(error, req, res, next) {
  console.log(error);

  if (error instanceof mongoose.Error.CastError)
    new BadRequest().sendReply(res);
  else if (error instanceof mongoose.Error.ValidationError)
    new ValidationError(error).sendReply(res);
  else if (error instanceof BaseError) error.sendReply(res);
  else new BaseError().sendReply(res);
}
