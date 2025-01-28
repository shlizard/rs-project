import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = (props) => {
  return (
    <>
      <div className="navItem">
        <span>{props.name}</span>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </>
  );
};

export default NavItem;
