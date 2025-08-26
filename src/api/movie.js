import axios from "axios";

export async function getMovies() {
  return await axios.get("movies/");
}

export async function getMovie(id) {
  return await axios.get(`movies/${id}/`);
}

export async function getMovieRating(movieId, userId) {
  return await axios.get(`movies/ratings/${movieId}/${userId}/`);
}

export async function createMovieRating(movieId, userId, ratings) {
  const like = ratings.isLike ? 1 : 0;
  const favorite = ratings.isFavorite ? 3 : 0;
  const dislike = ratings.isDislike ? 0 : 1;
  const stars = ratings.stars;

  const rating = ratings.isWatched
    ? ((like + favorite + stars + dislike) / 10) * 5
    : 0;

  return await axios.post("movies/ratings/", {
    ...ratings,
    rating: rating,
  });
}

export async function updateMovieRating(movieId, userId, ratings) {
  const like = ratings.isLike ? 1 : 0;
  const favorite = ratings.isFavorite ? 3 : 0;
  const dislike = ratings.isDislike ? 0 : 1;
  const stars = ratings.stars;

  const rating = ratings.isWatched
    ? ((like + favorite + stars + dislike) / 10) * 5
    : 0;

  return await axios.put(`movies/ratings/${movieId}/${userId}/`, {
    ...ratings,
    rating: rating,
  });
}
