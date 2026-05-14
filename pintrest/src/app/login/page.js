"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.logo}>A</div>

        <h1 className={styles.title}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <p className={styles.subtitle}>
          {isSignup
            ? "Sign up to continue"
            : "Login to continue your account"}
        </p>

        <form className={styles.form}>

          {isSignup && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Full Name"
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type={isSignup ? "email" : "text"}
              placeholder={isSignup ? "Email Address" : "Username"}
              className={styles.input}
            />
          </div>

          {isSignup && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Username"
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
            />

            <span className={styles.show}>
              Show
            </span>
          </div>

          {isSignup && (
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
              />
            </div>
          )}

          {!isSignup && (
            <div className={styles.row}>
              <label className={styles.remember}>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className={styles.link}>
                Forgot Password?
              </a>
            </div>
          )}

          {isSignup && (
            <label className={styles.remember}>
              <input type="checkbox" />
              I agree to Terms & Conditions
            </label>
          )}

          <button type="submit" className={styles.button}>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p className={styles.footer}>
            {isSignup
              ? "Already have an account?"
              : "Don’t have an account?"}

            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Sign Up"}
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}
