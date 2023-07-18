import express from "express";
import BookController from "../controllers/bookController.js";

const router = express.Router();

router
  .get("/livros", BookController.getBooks)
  .get("/livros/busca", BookController.getBookByPubCompany)
  .get("/livros/:id", BookController.getBookById)
  .post("/livros", BookController.registerBook)
  .put("/livros/:id", BookController.updateBook)
  .delete("/livros/:id", BookController.deleteBook);

export default router;
