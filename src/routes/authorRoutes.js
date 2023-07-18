import express from "express";
import AuthorController from "../controllers/authorController.js";

const router = express.Router();

router
  .get("/autores", AuthorController.getAuthors)
  .get("/autores/:id", AuthorController.getAuthorById)
  .post("/autores", AuthorController.registerAuthor)
  .put("/autores/:id", AuthorController.updateAuthor)
  .delete("/autores/:id", AuthorController.deleteAuthor);

export default router;
