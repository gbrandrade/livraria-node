import { books } from "../models/index.js";

class BookController {
  static getBooks = async (req, res, next) => {
    try {
      const booksResult = await books.find().populate("autor", "nome").exec();
      res.status(200).send(booksResult);
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    const id = req.params.id;
    try {
      const book = await books.findById(id).populate("autor", "nome").exec();
      if (book === null)
        res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send(book);
    } catch (error) {
      next(error);
    }
  };

  static registerBook = async (req, res, next) => {
    let book = new books(req.body);
    try {
      await book.save();
      res.status(201).send(book.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    const id = req.params.id;
    try {
      const book = await books.findByIdAndUpdate(
        id,
        { $set: req.body },
        { runValidators: true }
      );
      if (book === null)
        res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static deleteBook = async (req, res, next) => {
    const id = req.params.id;
    try {
      const book = await books.findByIdAndDelete(id);
      if (book === null)
        res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send("Livro excluido com sucesso");
    } catch (error) {
      next(error);
    }
  };

  static getBookByPubCompany = async (req, res, next) => {
    const pubCompany = req.query.editora;
    try {
      const book = await books.find({
        editora: `${pubCompany}`,
      });
      console.log(book);
      if (book === null)
        res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send(book);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
