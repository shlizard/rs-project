import { Person } from "@mui/icons-material";
import { Link } from "react-router";
import useUser from "../hooks/useUser";

const UserSettingsBtn = () => {
  const { user } = useUser();

  return (
    <>
      <Link className="nav-button" to={user ? "/dashboard" : "/login"}>
        {user ? (
          <Person
            sx={{
              fontSize: "1.3rem",
            }}
          />
        ) : (
          <span>ورود / ثبت نام</span>
        )}
      </Link>
    </>
  );
};

export default UserSettingsBtn;
