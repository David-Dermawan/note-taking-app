import styles from "./Login.module.css";
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
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <img src={logo} alt="Note Logo" />
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome to Note</h1>
          <p className={styles.subtitle}>Please log in to continue</p>
        </div>
        <div className={styles.form}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
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

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInputWrapper}>
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
                  className={styles.showPasswordBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? hidePasswordIcon : showPasswordIcon}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                  />
                </button>
              </div>
            </div>

            <input className={styles.submitBtn} type="submit" value="Login" />
          </form>
        </div>
        <div className={styles.socialLogin}>
          <p className={styles.divider}>Or log in with:</p>
          <button type="button" className={styles.googleBtn}>
            <img src={googleIcon} alt="Google" /> Google
          </button>
        </div>
        <p className={styles.signupLink}>
          No account yet? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
}
