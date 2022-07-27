import express from "express";

import {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
} from "../controllers/movie.js";

const router = express.Router();

router.get("/", getMovies);

router.post("/", createMovie);

router.get("/:id", getMovie);

router.delete("/:id", deleteMovie);

export default router;
