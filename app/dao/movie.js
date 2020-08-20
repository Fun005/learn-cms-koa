import { MovieModel } from "../models/movie";
import { NotFound } from "lin-mizar/lin";

class Movie {
  static async getMovieList() {
    return MovieModel.findAll();
  }

  static async addMovie (v) {
    return MovieModel.create(v);
  }

  static async editMovie(id, params) {
    const movie = await MovieModel.findByPk(id)
    if(!movie) {
      throw new NotFound()
    }
    return await movie.update({...params})
  }

  static async deleteMovieById(id) {
    return MovieModel.destroy({
      where: {id}
    });
  }
}

export { Movie as MovieDao }