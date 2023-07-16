import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros
        .find()
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livrosResultado);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const livro = await livros.findById(id).populate("autor", "nome").exec();
      if (livro === null) throw new Error();
      res.status(200).send(livro);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} Id do livro não localizado` });
    }
  };

  static cadastrarLivro = async (req, res) => {
    let livro = new livros(req.body);
    try {
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar o livro` });
    }
  };

  static atualizarLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send("Livro excluido com sucesso");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;
    try {
      const livrosResultado = await livros.find({ editora: `${editora}` });
      console.log(livrosResultado);
      if (livrosResultado.length === 0) throw new Error("");
      res.status(200).send(livrosResultado);
    } catch (error) {
      res.status(400).send(`${error.message}`);
    }
  };
}

export default LivroController;
