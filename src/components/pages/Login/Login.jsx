import loginStyles from "./Login.module.css";
import logo from "../../../assets/images/logo.svg";
import googleIcon from "../../../assets/images/icon-google.svg";
import hidePasswordIcon from "../../../assets/images/icon-hide-password.svg";
import showPasswordIcon from "../../../assets/images/icon-show-password.svg";
import { supabase } from "../../../utils/supabase";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.loginCard}>
        <img src={logo} alt="Note Logo" />
        <div className={loginStyles.header}>
          <h1 className={loginStyles.title}>Welcome to Note</h1>
          <p className={loginStyles.subtitle}>Please log in to continue</p>
        </div>
        <div className={loginStyles.form}>
          <form className={loginStyles.loginForm} onSubmit={handleLogin}>
            <div className={loginStyles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={loginStyles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={loginStyles.passwordInputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={loginStyles.showPasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? hidePasswordIcon : showPasswordIcon}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                  />
                </button>
              </div>
            </div>

            <input
              className={loginStyles.submitBtn}
              type="submit"
              value="Login"
            />
          </form>
        </div>
        <div className={loginStyles.socialLogin}>
          <p className={loginStyles.divider}>Or log in with:</p>
          <button type="button" className={loginStyles.googleBtn}>
            <img src={googleIcon} alt="Google" /> Google
          </button>
        </div>
        <p className={loginStyles.signupLink}>
          No account yet? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
