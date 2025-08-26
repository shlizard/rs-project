import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "./api/user";
import axios from "axios";
import useUser from "./hooks/useUser";
import { useMemo, useState } from "react";
import { MoviesPage } from "./pages/movies";
import { MovieDetailPage } from "./pages/movieDetail";
import { SeriesPage } from "./pages/series";
import { SerieDetailPage } from "./pages/serieDetail";
import { NotFound } from "./pages/notFound";

const App = () => {
  axios.defaults.headers["token"] = window.localStorage.getItem("token");
  const { login, user } = useUser();
  const [isEnabled, setIsEnabled] = useState(true);

  const query = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    enabled: isEnabled,
    staleTime: Infinity,
  });

  if (query.status === "success" && isEnabled) {
    setIsEnabled(false);
    const userData = query.data.data.data;
    window.localStorage.setItem("token", userData.token);
    login({ email: userData.email, id: userData.id });
  }

  return (
    <Routes>
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/series" element={<SeriesPage />} />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      <Route path="/series/:id" element={<SerieDetailPage />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="/" exact element={<Home />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} /> 
    </Routes>
  );
};

export default App;
