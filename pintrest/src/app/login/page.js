"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AuthPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className={styles.container}>

      {/* Navbar */}

      <div className={styles.navbar}>

        <div className={styles.logoSection}>
          <div className={styles.logo}>P</div>
          <span>Pinterest</span>
        </div>

        <button
          className={styles.signupBtn}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>

      </div>

      {/* Auth Box */}

      <div className={styles.loginBox}>

        <h1 className={styles.title}>
          {isSignup
            ? "Create a Pinterest account"
            : "Log in to Pinterest"}
        </h1>

        <button className={styles.googleBtn}>
          <span className={styles.googleIcon}>G</span>

          {isSignup
            ? "Continue with Google"
            : "Continue with Google"}
        </button>

        <div className={styles.or}>OR</div>

        {/* Signup Fields */}

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            className={styles.input}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
        />

        {isSignup && (
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
          />
        )}

        {/* Password */}

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

        {/* Confirm Password */}

        {isSignup && (
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
          />
        )}

        {/* Forgot Password */}

        {!isSignup && (
          <a href="#" className={styles.forgot}>
            Forgot your password?
          </a>
        )}

        {/* Terms */}

        {isSignup && (
          <label className={styles.termsCheck}>
            <input type="checkbox" />
            I agree to Terms & Conditions
          </label>
        )}

        {/* Button */}

        <button className={styles.loginBtn}>
          {isSignup ? "Create Account" : "Log in"}
        </button>

        {/* Bottom Text */}

        {!isSignup ? (
          <>
            <p className={styles.info}>
              Facebook login is no longer available
            </p>

            <a href="#" className={styles.update}>
              Update login method
            </a>

            <p className={styles.signupText}>
              No Account?

              <span onClick={() => setIsSignup(true)}>
                {" "}Sign up
              </span>
            </p>
          </>
        ) : (
          <p className={styles.signupText}>
            Already have an account?

            <span onClick={() => setIsSignup(false)}>
              {" "}Log in
            </span>
          </p>
        )}

        <p className={styles.business}>
          Are you a business?
          <span> Get started here!</span>
        </p>

        <p className={styles.terms}>
          By continuing, you agree to Pinterest's Terms
          of Service and acknowledge you've read our
          Privacy Policy.
        </p>

      </div>
    </div>
  );
}
