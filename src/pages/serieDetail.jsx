import Container from "@mui/material/Container";
import Navbar from "../components/navbar";
import "../css/movieSerieDetailPage.css";
import useTheme from "../hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import {
  Bookmark,
  Check,
  Favorite,
  Star,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import Rating from "@mui/material/Rating";
import { motion, stagger, useAnimate } from "motion/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSerieRating,
  getSerie,
  getSerieRating,
  updateSerieRating,
} from "../api/serie";
import { useParams } from "react-router";
import useUser from "../hooks/useUser";

export const SerieDetailPage = (props) => {
  const { theme } = useTheme();
  const { id } = useParams();
  const { user } = useUser();
  const [isEnabled, setIsEnabled] = useState(true);
  const [ratings, setRatings] = useState({
    movie: id,
    user: user.id,
    isWatched: false,
    isfFavorite: false,
    isBookmark: false,
    isLike: false,
    isDislike: false,
    stars: 0,
  });
  const queryClient = useQueryClient();

  const [scope, animate] = useAnimate();

  const query = useQuery({
    queryFn: async () => {
      return await getSerie(id);
    },
    queryKey: [`series/${id}`],
    staleTime: Infinity,
    enabled: isEnabled,
  });

  const serie = useMemo(() => {
    return query.status === "success" ? query.data.data : {};
  }, [query]);

  const ratingsQuery = useQuery({
    queryFn: async () => {
      return await getSerieRating(id, user.id);
    },
    queryKey: [`series/rating/${id}/${user.id}`],
    staleTime: Infinity,
    enabled: isEnabled,
  });

  if (ratingsQuery.status === "success" && isEnabled) {
    setIsEnabled(false);
    setRatings(
      queryClient.getQueryData([`series/rating/${id}/${user.id}`]).data
    );
  }

  const ratingsMutation = useMutation({
    mutationFn: async () => {
      return ratingsQuery.status === "success"
        ? await updateSerieRating(id, user.id, ratings)
        : await createSerieRating(id, user.id, ratings);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`series/rating/${id}/${user.id}`], data);
    },
  });

  const handleIconClick = ({ currentTarget: button }) => {
    setIsEnabled(false);
    animate([
      [
        `.ms-detail-page-icons[name=${button.name}]`,
        { scale: 0.1 },
        { duration: 0.1, delay: stagger(0.05) },
      ],
      [
        `.ms-detail-page-icons[name=${button.name}]`,
        { scale: 1 },
        { duration: 0.1 },
      ],
    ]);

    const a = { ...ratings };

    if (button.name === "isBookmark") {
      a["isWatched"] = false;
      a["isFavorite"] = false;
      a["isLike"] = false;
      a["isDislike"] = false;
      a["stars"] = 0;
    }

    if (button.name === "isWatched") {
      a["isFavorite"] = false;
      a["isBookmark"] = false;
      a["isLike"] = false;
      a["isDislike"] = false;
      a["stars"] = 0;
    }

    if (button.name === "isLike") {
      a["isDislike"] = false;
    }

    if (button.name === "isDislike") {
      a["isLike"] = false;
    }
    a[button.name] = !a[button.name];
    setRatings(a);

    ratingsMutation.mutate(id, user.id, ratings);
  };

  return query.status === "success" ? (
    <>
      <Navbar />
      <main
        className="ms-detail-page-container"
        style={{
          backgroundImage:
            theme === "dark"
              ? "url(/static/images/defaultMoviePageBg.svg)"
              : "url(/static/images/defaultSeriePageBg.svg)",
          height: "100vh",
        }}
      >
        <Container maxWidth="xl" className="ms-detail-page-container-box">
          <div className="ms-detail-page-box">
            <div className="ms-detail-page-box-titles">
              <h1 className="ms-detail-page-heading">{serie.name}</h1>
              <span className="ms-detail-page-span">
                {serie.genre.map((v, i) =>
                  serie.genre.length - 1 > i ? v + " | " : v
                )}
              </span>
              <div className="ms-imdb">
                <FontAwesomeIcon icon={faImdb} style={{ fontSize: "2rem" }} />
                <span className="ms-imdb-span">{serie.imdb}/۱۰</span>
              </div>

              <span className="ms-detail-page-span">۱۴۰۳</span>
              <span className="ms-detail-page-span">{serie.season} فصل</span>
              <span className="ms-detail-page-span">{serie.country}</span>
              <span className="ms-detail-page-span ms-age-span">
                {serie.age}
              </span>

              <div ref={scope} className="ms-detail-page-icons-container">
                <button
                  name="isBookmark"
                  className={`ms-detail-page-icons ${
                    ratings.isBookmark ? "ms-detail-page-icons-active" : ""
                  }`}
                  onClick={handleIconClick}
                >
                  <Bookmark sx={{ fontSize: "1.5rem" }} />
                </button>
                <button
                  name="isWatched"
                  className={`ms-detail-page-icons ms-watched-icon ${
                    ratings.isWatched ? "ms-detail-page-icons-active" : ""
                  }`}
                  onClick={handleIconClick}
                >
                  <Check sx={{ fontSize: "1.5rem" }} />
                </button>

                <motion.div
                  layout
                  transition={{
                    default: { ease: "linear" },
                    layout: { duration: 0.3 },
                  }}
                  className={`ms-detail-watched-ratings-btn ${
                    ratings.isWatched
                      ? "ms-detail-watched-ratings-btn-active"
                      : ""
                  }`}
                >
                  <button
                    name="isFavorite"
                    className={`ms-detail-page-icons ${
                      ratings.isFavorite ? "ms-detail-page-icons-active" : ""
                    }`}
                    onClick={handleIconClick}
                  >
                    <Favorite sx={{ fontSize: "1.5rem" }} />
                  </button>
                  <button
                    name="isLike"
                    className={`ms-detail-page-icons ${
                      ratings.isLike ? "ms-detail-page-icons-active" : ""
                    }`}
                    onClick={handleIconClick}
                  >
                    <ThumbUp sx={{ fontSize: "1.5rem" }} />
                  </button>
                  <button
                    name="isDislike"
                    className={`ms-detail-page-icons ${
                      ratings.isDislike ? "ms-detail-page-icons-active" : ""
                    }`}
                    onClick={handleIconClick}
                  >
                    <ThumbDown sx={{ fontSize: "1.5rem" }} />
                  </button>
                </motion.div>
              </div>

              <motion.div style={{ position: "relative" }}>
                <Rating
                  name="size-large"
                  value={ratings.stars}
                  size="large"
                  className={`star-ratings ${
                    ratings.isWatched ? "star-ratings-show" : ""
                  }`}
                  onChange={(event, newValue) => {
                    const a = { ...ratings };
                    a["stars"] = newValue ? newValue : 0;
                    setRatings(a);
                    ratingsMutation.mutate(id, user.id, ratings);
                  }}
                  emptyIcon={
                    <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </motion.div>
            </div>
            <p className="ms-detail-page-paragraph">
              <h1>خلاصه داستان :</h1>
              {serie.description}
            </p>
          </div>
          <div
            className="ms-detail-img-container"
            style={{
              backgroundImage: "url(/static/images/defaultSerieBg.svg)",
            }}
          >
            {serie.image ? (
              <img src={serie.image} alt="" className="ms-detail-img" />
            ) : (
              <></>
            )}
          </div>
        </Container>
      </main>
    </>
  ) : (
    <></>
  );
};
