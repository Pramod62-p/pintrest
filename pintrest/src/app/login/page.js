"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>

      {/* Top Navbar */}
      <div className={styles.navbar}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>P</div>
          <span>Pinterest</span>
        </div>

        <button className={styles.signupBtn}>
          Sign up
        </button>
      </div>

      {/* Login Box */}
      <div className={styles.loginBox}>

        <h1 className={styles.title}>
          Log in to Pinterest
        </h1>

        <button className={styles.googleBtn}>
          <span className={styles.googleIcon}>G</span>
          Continue with Google
        </button>

        <div className={styles.or}>OR</div>

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        <a href="#" className={styles.forgot}>
          Forgot your password?
        </a>

        <button className={styles.loginBtn}>
          Log in
        </button>

        <p className={styles.info}>
          Facebook login is no longer available
        </p>

        <a href="#" className={styles.update}>
          Update login method
        </a>

        <p className={styles.signupText}>
          No Account?
          <span> Sign up</span>
        </p>

        <p className={styles.business}>
          Are you a business?
          <span> Get started here!</span>
        </p>

        <p className={styles.terms}>
          By continuing, you agree to Pinterest's Terms of
          Service and acknowledge you've read our Privacy
          Policy.
        </p>

      </div>
    </div>
  );
}
