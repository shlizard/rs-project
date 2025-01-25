import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavItem = (props) => {
  return (
    <>
      <span>{props.name}</span>
      <FontAwesomeIcon icon={faAngleDown} />
    </>
  );
};

export default NavItem;
