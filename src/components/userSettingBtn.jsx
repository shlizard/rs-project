import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const UserSettingsBtn = () => {
  return (
    <>
      <Link>
        <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
      </Link>
    </>
  );
};

export default UserSettingsBtn;
