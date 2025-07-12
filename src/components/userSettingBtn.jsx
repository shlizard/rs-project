import { Person } from "@mui/icons-material";
import { Link } from "react-router";

const UserSettingsBtn = () => {
  return (
    <>
      <Link className="nav-button">
        <Person sx={{
          fontSize: "1.3rem"
        }}/>
      </Link>
    </>
  );
};

export default UserSettingsBtn;
