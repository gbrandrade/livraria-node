import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor é obrigatório"],
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido",
    },
  },
  numeroPaginas: {
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000"],
  },
});

const books = mongoose.model("livros", bookSchema);
export default books;
