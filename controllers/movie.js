import { v4 as uuidv4 } from "uuid";
import { movieData } from "../data/movie.js";

let { movies } = movieData;

//List All The Movies in the List
export const getMovies = (req, res) => {
  if (movies.length <= 0) {
    return res.status(200).json({ msg: "No movies is found in the list " });
  }
  try {
    res.status(200).json(movies);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message);
  }
};

//Add a movie to the list
export const createMovie = (req, res) => {
  const { title, director, releaseDate } = req.body;
  if (!title || !director || !releaseDate) {
    return res
      .status(400)
      .json({ msg: "Please include title,director and releaseDate" });
  }
  const found = movies.find(
    (movie) =>
      movie.title === title &&
      movie.director === director &&
      movie.releaseDate === releaseDate
  );
  if (found) {
    return res.status(400).json({
      msg: `Movie with title:${title}, director:${director} and releaseDate:${releaseDate} already exists!`,
    });
  }
  try {
    const movie = {
      id: uuidv4(),
      title: title,
      director: director,
      releaseDate: releaseDate,
    };
    movies.push(movie);
    res.status(201).json({
      msg: `Movie ${movie.title} with the id :${movie.id} is added to the list!`,
    });
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message);
  }
};

//Search For a Movie In the List
export const getMovie = (req, res) => {
  const movie = movies.find((movie) => movie.id === req.params.id);
  if (!movie) {
    return res
      .status(400)
      .json({ msg: `No movie is found with the id:${req.params.id} ` });
  }
  try {
    res.status(200).json(movie);
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message);
  }
};

//Delete A movie from the List
export const deleteMovie = (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res
      .status(400)
      .json({ msg: `No movie is found with the id:${id} ` });
  }
  try {
    movies = movies.filter((movie) => movie.id !== id);
    res.status(200).json({ msg: `user with id ${id} has been deleted` });
  } catch (err) {
    res.status(err.statusCode || 500).send(err.message);
  }
};
