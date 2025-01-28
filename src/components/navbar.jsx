import Exit from "./exit_btn";
import Nav from "./nav";
import Search from "./search";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <>
      <nav>
        <Nav />
        <Search />
        <Exit />
      </nav>
    </>
  );
};

export default Navbar;
