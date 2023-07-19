import express from "express";
import AuthorController from "../controllers/authorController.js";
import page from "../middlewares/page.js";

const router = express.Router();

router
  .get("/autores", AuthorController.getAuthors, page)
  .get("/autores/:id", AuthorController.getAuthorById)
  .post("/autores", AuthorController.registerAuthor)
  .put("/autores/:id", AuthorController.updateAuthor)
  .delete("/autores/:id", AuthorController.deleteAuthor);

export default router;
