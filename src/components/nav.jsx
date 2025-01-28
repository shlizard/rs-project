import NavItem from "./navItem";
import UserSettingsBtn from "./userSettingBtn";

const Nav = () => {
  return (
    <>
      <div className="nav">
        <UserSettingsBtn />
        <div className="navItems">
          <NavItem name={"فیلم"} />
          <NavItem name={"سریال ها"} />
          <NavItem name={"مجموعه ها"} />
        </div>
      </div>
    </>
  );
};

export default Nav;
