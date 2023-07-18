import NotFound from "../errors/NotFound.js";

export default function handler404(req, res, next) {
  const error404 = new NotFound();
  next(error404); //envia para o erro para o middleware manipuladorDeErros
}
