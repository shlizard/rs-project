import NavItem from "./navItem";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-items">
          <NavItem link={"/movies"} name={"فیلم"} />
          <NavItem link={"/series"} name={"سریال"} />
          <NavItem link={"/movies"} name={"مجموعه ها"} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
