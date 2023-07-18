import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: [true, "O nome do autor é obrigatório"] },
    nacionalidade: { type: String },
  },
  {
    versionKey: false,
  }
);

const authors = mongoose.model("autores", authorSchema);
export default authors;
