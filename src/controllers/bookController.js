import { authors, books } from "../models/index.js";

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
        return res.status(404).send({ message: "Id do livro não localizado" });
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
        return res.status(404).send({ message: "Id do livro não localizado" });
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
        return res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send("Livro excluido com sucesso");
    } catch (error) {
      next(error);
    }
  };

  static getBookByFilter = async (req, res, next) => {
    try {
      const search = await handleFilters(req.query);
      if (search === null) return res.status(200).send([]);

      const book = await books.find(search);
      console.log(book);
      if (book === null)
        return res.status(404).send({ message: "Id do livro não localizado" });

      res.status(200).send(book);
    } catch (error) {
      next(error);
    }
  };
}

async function handleFilters(params) {
  const { editora, titulo, minPages, maxPages, nomeAutor } = params;
  const search = {};
  if (editora) search.editora = { $regex: editora, $options: "i" };
  if (titulo) search.titulo = { $regex: titulo, $options: "i" };

  if (minPages || maxPages) search.numeroPaginas = {}; //necessário para as atribuições seguintes
  if (minPages) search.numeroPaginas.$gte = minPages;
  if (maxPages) search.numeroPaginas.$lte = maxPages;

  if (nomeAutor) {
    const author = await authors.findOne({ nome: nomeAutor });
    if (author === null) return null;
    search.autor = author._id;
  }
  return search;
}

export default BookController;
