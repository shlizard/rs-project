import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/navbar";
import { Movie } from "../components/movie";
import Container from "@mui/material/Container";
import React from "react";
import "../css/movieSeriePage.css";
import { useNavigate } from "react-router";
import { getSeries } from "../api/serie";
import { Serie } from "../components/serie";

export const SeriesPage = () => {
  const { data, status } = useQuery({
    queryFn: getSeries,
    queryKey: ["series"],
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
                    navigate(`/series/${v.id}`);
                  }}
                >
                  <Serie
                    img={v.image ? v.image : "/static/images/defaultMovieBg.svg"}
                    name={v.name}
                    imdb={v.imdb}
                    genre={v.genre}
                    year={v.year}
                    season={v.season}
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
