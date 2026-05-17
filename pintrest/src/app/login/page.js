"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function PinterestAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      {/* Navbar */}

      <div className={styles.navbar}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>P</div>
          <h2>Pinterest</h2>
        </div>

        <button
          className={styles.topButton}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </div>

      {/* Main Card */}

      <div className={styles.card}>
        <h1>{isSignup ? "Sign up to Pinterest" : "Log in to Pinterest"}</h1>

        {/* Google Button */}

        <button className={styles.googleBtn}>
          <span className={styles.googleIcon}>G</span>
          Continue with Google
        </button>

        <div className={styles.or}>OR</div>

        {/* Signup Fields */}

        {isSignup && (
          <input
            type="text"
            placeholder="Full name"
            className={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
        />

        {/* Password */}

        <div className={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.passwordInput}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>

        {/* Confirm Password */}

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
          />
        )}

        {!isSignup && (
          <p className={styles.forgot}>Forgot your password?</p>
        )}

        {/* Button */}

        <button className={styles.loginBtn}>
          {isSignup ? "Sign up" : "Log in"}
        </button>

        {/* Bottom Text */}

        {!isSignup && (
          <>
            <p className={styles.facebook}>
              Facebook login is no longer available
            </p>

            <button className={styles.updateBtn}>
              Update login method
            </button>
          </>
        )}

        <p className={styles.switchText}>
          {isSignup ? "Already have an account?" : "No Account?"}

          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Log in" : " Sign up"}
          </span>
        </p>

        <p className={styles.business}>
          Are you a business? Get started here!
        </p>

        <p className={styles.terms}>
          By continuing, you agree to Pinterest's Terms of Service and
          acknowledge you've read our Privacy Policy.
        </p>
      </div>
    </div>
  );
}
