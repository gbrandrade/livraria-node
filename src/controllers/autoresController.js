import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find({});
      res.status(200).send(autoresResultado);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findById(id);
      if (autor === null) throw new Error("");
      res.status(200).send(autor);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - Id do autor não localizado` });
    }
  };

  static cadastrarAutor = async (req, res) => {
    let autor = new autores(req.body);
    try {
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar o autor` });
    }
  };

  static atualizarAutor = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirAutor = async (req, res) => {
    const id = req.params.id;
    try {
      const autor = await autores.findByIdAndDelete(id);
      res.status(200).send("Autor excluido com sucesso");
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default AutorController;
