import ExitBtn from "./exit_btn";
import NavItem from "./navItem";
import Search from "./search";

const Nav = () => {
  return (
    <>
      <NavItem name={"فیلم"} />
      <NavItem name={"سریال ها"} />
      <NavItem name={"مجموعه ها"} />
      <Search />
      <ExitBtn />
    </>
  );
};

export default Nav;
