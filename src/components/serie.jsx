import { Bookmark, Favorite } from "@mui/icons-material";
import "../css/movieSerie.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

export const Serie = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const handleIconClick = ({ currentTarget: button }) => {
    if (button.name === "favorite") {
      setIsFavorite(!isFavorite);
      return;
    }

    setIsBookmark(!isBookmark);
  };

  return (
    <>
      <div className="ms-container">
        <img src={props.img} alt="تصویر" className="ms-img" />
        <div className="ms-detail-container">
          <div className="ms-icons-container">
            <button
              name="favorite"
              className={`ms-icons ${isFavorite ? "ms-icons-active" : ""}`}
              onClick={handleIconClick}
            >
              <Favorite sx={{ fontSize: "1rem" }} />
            </button>
            <button
              name="bookmark"
              className={`ms-icons ${isBookmark ? "ms-icons-active" : ""}`}
              onClick={handleIconClick}
            >
              <Bookmark sx={{ fontSize: "1rem" }} />
            </button>
          </div>
          <div className="ms-detail-span-container">
            {props.imdb ? (
              <div className="ms-imdb">
                <FontAwesomeIcon icon={faImdb} style={{ fontSize: "2rem" }} />
                <span className="ms-imdb-span">{props.imdb}/۱۰</span>
              </div>
            ) : (
              <></>
            )}
            <div className="ms-detail-span-box">
              <span className="ms-detail-span">
                {props.genre.map((v, i) => {
                  if (props.genre.length === i + 1) return v;
                  return v + "، ";
                })}
              </span>
              <span className="ms-detail-span">
                {props.year} / {props.country}
              </span>
              <span>{props.season} فصل</span>
            </div>
            <span className="ms-age-span">{props.age}+</span>
          </div>
        </div>
        <h1 className="ms-title">{props.name}</h1>
      </div>
    </>
  );
};
