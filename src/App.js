import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/home";
import { ThemeContextProvider } from "./contexts/themeContext";

const App = () => {  
  return (
    <ThemeContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Home />} />
          </Routes>
        </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
