import Exit from "./exit_btn";
import Nav from "./nav";
import Search from "./search";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <>
      <div class="navbar">
        <Nav />
        <Search />
        <Exit />
      </div>
    </>
  );
};

export default Navbar;
