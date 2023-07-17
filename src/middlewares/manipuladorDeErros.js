import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
export default function manipuladorDeErros(error, req, res, next) {
  console.log(error);

  if (error instanceof mongoose.Error.CastError)
    new RequisicaoIncorreta().enviarResposta(res);
  else if (error instanceof mongoose.Error.ValidationError)
    new ErroValidacao(error).enviarResposta(res);
  else if (error instanceof NaoEncontrado) error.enviarResposta(res);
  else new ErroBase().enviarResposta(res);
}
