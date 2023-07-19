import express from "express";
import BookController from "../controllers/bookController.js";
import page from "../middlewares/page.js";

const router = express.Router();

router
  .get("/livros", BookController.getBooks, page)
  .get("/livros/busca", BookController.getBookByFilter, page)
  .get("/livros/:id", BookController.getBookById)
  .post("/livros", BookController.registerBook)
  .put("/livros/:id", BookController.updateBook)
  .delete("/livros/:id", BookController.deleteBook);

export default router;
