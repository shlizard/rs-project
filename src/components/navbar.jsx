import Nav from "./nav";
import "../css/navbar.css";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SearchButton from "./searchButton";
import {
  useScroll,
  motion,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useState } from "react";
import { ThemeSelectorButton } from "./themeSelectorButton";
import UserSettingsBtn from "./userSettingBtn";

const Navbar = () => {
  const { scrollYProgress } = useScroll({
    offset: ["125vh", "160vh"],
  });

  const [YProgress, setYProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setYProgress(latest);
  });

  const top = useTransform(scrollYProgress, [0, 1], ["-5rem", "1rem"]);

  return (
    <>
      <motion.header
        style={{
          top,
          width: YProgress < 0.1 ? "auto" : "fit-content",
          borderRadius: YProgress < 0.1 ? "0" : "100vh",
          // border: YProgress < 0.1 ? "" : "1px solid hsl(0, 0%, 0%, 0.1)",
          // background: YProgress < 0.1 ? "transparent" : "hsl(166, 95%, 100%, 0.1)",
        }}
        className={YProgress < 0.1 ? "nav-header" : "nav-header scroll-header"}
      >
        <Container maxWidth="xl" className="header">
          <Nav />
          <Box
            sx={{
              flex: "1 1 0",
              justifyContent: "flex-end",
              gap: "2rem",
              display: YProgress < 0.1 ? "flex" : "none",
            }}
            component={"div"}
            className="left-header-side"
          >
            <ThemeSelectorButton />
            <SearchButton />
            <UserSettingsBtn />
          </Box>
        </Container>
      </motion.header>
    </>
  );
};

export default Navbar;
