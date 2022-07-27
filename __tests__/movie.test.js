import app from "../app.js";
import supertest from "supertest";
import { movieData } from "../data/movie.js";

let { movies } = movieData;
import { v4 as uuidv4 } from "uuid";
const request = supertest(app);

//Add Movie

describe("POST/movie", () => {
  describe("when a movie title, director or release date is not provided", () => {
    const bodyData = [
      { title: "", director: "Abc", releaseDate: "2011-12-23" },
      { title: "Angry Birds", director: null },
      { title: "Angry Birds", releaseDate: undefined },
      { title: null, director: null, releaseDate: null },
      {},
    ];

    //Respond with 400 status code
    it("should respond with a 400 status code ", async () => {
      for (const body of bodyData) {
        const response = await request.post("/movie").send(body);
        expect(response.status).toBe(400);
      }
    });

    //Respond with a JSON
    it("should specify JSON in the content type header ", async () => {
      for (const body of bodyData) {
        const response = await request.post("/movie").send(body);
        expect(response.headers["content-type"]).toMatch(/json/);
      }
    });
  });

  //When a valid title , director name and release date are given

  describe("When a valid title, director name and release date are given", () => {
    describe("When the movie already exists in the database", () => {
      it("should respond with a 400 status code  ", async () => {
        const response = await request.post("/movie").send(movies[0]);
        expect(response.status).toBe(400);
      });
    });

    describe("When the movie does not exist in the database", () => {
      const body = {
        title: uuidv4().toString(),
        director: "Sweety",
        releaseDate: "2005-12-03",
      };
      // Respond with 200 status Code
      it("should respond with a 200 status code  ", async () => {
        const response = await request.post("/movie").send(body);
        expect(response.status).toBe(201);
      });

      it("should specify JSON in the content type header ", async () => {
        const response = await request.post("/movie").send(body);
        expect(response.headers["content-type"]).toMatch(/json/);
      });
    });
  });
});

//Get Movies in the List

describe("get/movie", () => {
  describe("when there is a movie in the list ", () => {
    movies.push({
      id: uuidv4(),
      title: "oyy",
      director: "Ali veli",
      releaseDate: "2010-12-2012",
    });
    it("should respond with a 200 status code and return  ", async () => {
      const response = await request.get("/movie");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(movies);
    });
  });
});

//Search For a Movie

describe("get/movie/:id", () => {
  describe("when the movie exists in the list ", () => {
    it("should respond with a 200 status code and movie data", async () => {
      const { id } = movies[0];
      const response = await request.get(`/movie/${id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(movies[0]);
    });
  });
  describe("when the movie does not exist in the list ", () => {
    it("should respond with a 404 status code ", async () => {
      const id = uuidv4();
      const response = await request.get(`/movie/${id}`);
      expect(response.status).toBe(404);
    });
  });
});

//Delete a Movie

describe("delete/movie/:id", () => {
  describe("when the movie exists in the list ", () => {
    it("should respond with a 200 status code and  delete movie data", async () => {
      const { id } = movies[0];
      const response = await request.delete(`/movie/${id}`);
      expect(response.status).toBe(200);
    });
  });
  describe("when the movie does not exist in the list ", () => {
    it("should respond with a 404 status code ", async () => {
      const id = uuidv4();
      const response = await request.delete(`/movie/${id}`);
      expect(response.status).toBe(404);
    });
  });
});
