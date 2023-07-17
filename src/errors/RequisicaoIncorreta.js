import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
  constructor(msg = "Um ou mais dados fornecidos estão incorretos") {
    super(msg, 400);
  }
}

export default RequisicaoIncorreta;
