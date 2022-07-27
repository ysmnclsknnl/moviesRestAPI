import express from "express";
import movieRoutes from "./routes/movie.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movie", movieRoutes);

export default app;
