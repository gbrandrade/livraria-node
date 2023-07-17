import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros
        .find()
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livrosResultado);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const livro = await livros.findById(id).populate("autor", "nome").exec();
      if (livro === null)
        res.status(404).send({ message: "Id do livro não localizado" });
      res.status(200).send(livro);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    let livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send("Livro excluido com sucesso");
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      const livrosResultado = await livros.find({ editora: `${editora}` });
      console.log(livrosResultado);
      if (livrosResultado.length === 0) throw new Error("");
      res.status(200).send(livrosResultado);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
