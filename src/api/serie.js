import axios from "axios";

export async function getSeries() {
  return await axios.get("series/");
}

export async function getSerie(id) {
  return await axios.get(`series/${id}/`);
}

export async function getSerieRating(movieId, userId) {
  return await axios.get(`series/ratings/${movieId}/${userId}/`);
}

export async function createSerieRating(movieId, userId, ratings) {
  const like = ratings.isLike ? 1 : 0;
  const favorite = ratings.isFavorite ? 3 : 0;
  const dislike = ratings.isDislike ? 0 : 1;
  const stars = ratings.stars;

  const rating = ratings.isWatched
    ? ((like + favorite + stars + dislike) / 10) * 5
    : 0;

  return await axios.post("series/ratings/", {
    ...ratings,
    rating: rating,
  });
}

export async function updateSerieRating(movieId, userId, ratings) {
  const like = ratings.isLike ? 1 : 0;
  const favorite = ratings.isFavorite ? 3 : 0;
  const dislike = ratings.isDislike ? 0 : 1;
  const stars = ratings.stars;

  const rating = ratings.isWatched
    ? ((like + favorite + stars + dislike) / 10) * 5
    : 0;

  return await axios.put(`series/ratings/${movieId}/${userId}/`, {
    ...ratings,
    rating: rating,
  });
}
