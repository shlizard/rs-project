import { useContext, useState } from "react";
import { themeContext } from "../../contexts/themeContext";
import "../../css/auth.css";
import {
  Email,
  Info,
  Lock,
  VisibilityOffSharp,
  VisibilitySharp,
} from "@mui/icons-material";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../api/user";

export const Login = () => {
  const { theme } = useContext(themeContext);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      if (error.errors) {
        console.log(error.errors);
      }
      if (error.response) {
        console.log(error.response.data.massage);
      }
      console.log(error);
    },
    onSuccess: (data) => {
      const user = data.data.data;
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      window.localStorage.setItem("token", user.token);
      window.location = "/";
    },
  });

  const handleChange = ({ currentTarget: input }) => {
    const a = { ...account };
    a[input.id] = input.value;
    setAccount(a);
  };

  const handleSubmit = async () => {
    mutate(account);
  };

  const iconStyle = {
    fontSize: "1.2rem",
    right: ".7rem",
  };

  const toggleShownPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <>
      <div theme={theme} className="login-register-page">
        <div className="login-register-box">
          <h1 className="login-register-title">ورود</h1>
          <label htmlFor="email" className="login-register-input-label">
            <div className="login-register-icon-box">
              <Email sx={iconStyle} />
            </div>

            <input
              className="login-register-input"
              type="email"
              id="email"
              placeholder="ایمیل"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="password" className="login-register-input-label">
            <div className="login-register-icon-box">
              <Lock sx={iconStyle} />
              <button
                name="password"
                className="login-register-password-shown-toggle"
                onClick={toggleShownPassword}
              >
                <VisibilitySharp
                  sx={{
                    ...iconStyle,
                    display: isPasswordShown ? "block" : "none",
                  }}
                />
                <VisibilityOffSharp
                  sx={{
                    ...iconStyle,
                    display: isPasswordShown ? "none" : "block",
                  }}
                />
              </button>
            </div>
            <input
              className="login-register-input"
              type={isPasswordShown ? "text" : "password"}
              id="password"
              placeholder="رمز عبور"
              onChange={handleChange}
              minLength={4}
              required
            />
          </label>

          <div className="login-register-info-texts">
            <p className="login-register-input-massage" name={"password"}>
              <Info
                sx={{
                  fontSize: ".9rem",
                  alignSelf: "center",
                }}
                className="info-icon"
              />
              <span>رمز عبور باید حداقل دارای 4 حرف یا عدد باشد</span>
            </p>
            <p className="login-register-input-massage">
              <Info
                sx={{
                  fontSize: ".9rem",
                  alignSelf: "center",
                }}
                className="info-icon"
              />
              <span>
                اگر ثبت نام نکردید{" "}
                <Link className="login-register-link" to={"/register"}>
                  ثبت نام
                </Link>{" "}
                کنید .
              </span>
            </p>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            ورود
          </button>
        </div>
      </div>
    </>
  );
};
