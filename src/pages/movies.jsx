import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/movie";
import Navbar from "../components/navbar";
import { Movie } from "../components/movie";
import Container from "@mui/material/Container";
import React from "react";
import "../css/movieSeriePage.css";
import { useNavigate } from "react-router";

export const MoviesPage = () => {
  const { data, status } = useQuery({
    queryFn: getMovies,
    queryKey: ["movies"],
  });

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="ms-page-container">
        <Container maxWidth="xl" className="ms-select-container">
          {status === "success" ? (
            data.data.map((v, i) => (
              <React.Fragment key={i}>
                <button
                  onClick={() => {
                    navigate(`/movies/${v.id}`);
                  }}
                >
                  <Movie
                    img={
                      v.image ? v.image : "/static/images/defaultMovieBg.svg"
                    }
                    name={v.name}
                    imdb={v.imdb}
                    genre={v.genre}
                    year={v.year}
                    hour={v.hour}
                    minute={v.minute}
                    country={v.country}
                    age={v.age}
                  />
                </button>
              </React.Fragment>
            ))
          ) : (
            <></>
          )}
        </Container>
      </main>
    </>
  );
};
