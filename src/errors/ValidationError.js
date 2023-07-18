import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest {
  constructor(error) {
    const errorMsg = Object.values(error.errors)
      .map((err) => err.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorMsg}`);
  }
}

export default ValidationError;
