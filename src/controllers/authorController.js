import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";

class AuthorController {
  static getAuthors = async (req, res, next) => {
    try {
      const authorsResult = await authors.find({});
      res.status(200).send(authorsResult);
    } catch (error) {
      next(error);
    }
  };

  static getAuthorById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const author = await authors.findById(id);
      if (author === null) next(new NotFound("Id do autor não localizado"));
      else res.status(200).send(author);
    } catch (error) {
      next(error);
    }
  };

  static registerAuthor = async (req, res, next) => {
    let author = new authors(req.body);
    try {
      await author.save();
      res.status(201).send(author.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const author = await authors.findByIdAndUpdate(id, { $set: req.body });
      if (author === null) next(new NotFound("Autor não encontrado"));
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    const id = req.params.id;
    try {
      const author = await authors.findByIdAndDelete(id);
      if (author === null) next(new NotFound("Autor não encontrado"));
      res.status(200).send("Autor excluido com sucesso");
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
