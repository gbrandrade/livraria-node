import BadRequest from "../errors/BadRequest.js";

async function page(req, res, next) {
  try {
    const { limite = 5, pagina = 1, ordenacao = "_id:1" } = req.query;
    const [campo, ordem] = ordenacao.split(":");
    if (limite <= 0 || pagina <= 0) return next(new BadRequest());

    const result = req.result;

    const pagedResult = await result
      .find()
      .sort({ [campo]: parseInt(ordem) }) // -1 = ordem decrescente
      .skip((pagina - 1) * limite)
      .limit(limite)
      .exec();

    res.status(200).json(pagedResult);
  } catch (error) {
    next(error);
  }
}

export default page;
