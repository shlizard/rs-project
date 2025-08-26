import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
} from "@mui/icons-material";
import Navbar from "../components/navbar";
import "../css/homePage.css";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="home-page-header">
        <Navbar />
        <div maxWidth="xl" className="banner">
          <Container maxWidth="xl" className="banner-detail">
            <div style={{ width: "max-content", alignSelf: "center" }}>
              <h1 className="banner-title">فیلم یاب زندگی ناب</h1>
            </div>
            <div className="banner-buttons">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="banner-info-btn"
              >
                ساخت اکانت
              </button>
              <button
                onClick={() => {
                  navigate("/movies");
                }}
                className="banner-info-btn"
              >
                فیلم ها
              </button>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

export default Home;
