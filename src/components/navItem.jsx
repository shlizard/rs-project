import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const NavItem = (props) => {
  return (
    <>
      <div className="nav-item">
        <Link className="nav-item-link" to={props.link}>
          <span>{props.name}</span>
          <FontAwesomeIcon icon={faAngleDown} className="nav-icon" />
        </Link>
      </div>
    </>
  );
};

export default NavItem;
