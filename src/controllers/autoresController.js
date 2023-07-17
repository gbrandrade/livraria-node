import NaoEncontrado from "../errors/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find({});
      res.status(200).send(autoresResultado);
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autor = await autores.findById(id);
      if (autor === null) next(new NaoEncontrado("Id do autor não localizado"));
      else res.status(200).send(autor);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    let autor = new autores(req.body);
    try {
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
      if (autor === null) next(new NaoEncontrado("Autor não encontrado"));
      res.status(200).send({ message: "autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndDelete(id);
      if (autor === null)
        next(new NaoEncontrado("Autor não encontrado")) /
          res.status(200).send("Autor excluido com sucesso");
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;
