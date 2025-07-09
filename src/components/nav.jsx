import NavItem from "./navItem";

const Nav = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav-items">
          <NavItem name={"فیلم"} />
          <NavItem name={"سریال"} />
          <NavItem name={"مجموعه ها"} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
