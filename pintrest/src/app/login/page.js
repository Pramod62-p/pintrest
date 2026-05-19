"use client";

import { useState, useRef, useCallback } from "react";
import styles from "./page.module.css";

// Icons
const GoogleSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const EyeOpen = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeClosed = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

// Toast Hook
function useToast() {

  const [toast, setToast] = useState({
    msg: "",
    show: false,
  });

  const timer = useRef(null);

  const showToast = useCallback((msg) => {

    clearTimeout(timer.current);

    setToast({
      msg,
      show: true,
    });

    timer.current = setTimeout(() => {
      setToast((t) => ({
        ...t,
        show: false,
      }));
    }, 2300);

  }, []);

  return { toast, showToast };
}

// Validation
const validateEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const validatePassword = (p) =>
  p.length >= 6;

export default function PinterestAuth() {

  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const { toast, showToast } = useToast();

  // Switch Mode
  const switchMode = () => {

    setIsSignup((s) => !s);

    setErrors({});
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  // Validate
  function validate() {

    const errs = {};

    if (isSignup && !name.trim()) {
      errs.name = "Name is required.";
    }

    if (!validateEmail(email)) {
      errs.email = "Enter a valid email address.";
    }

    if (!validatePassword(password)) {
      errs.password =
        "Password must be at least 6 characters.";
    }

    if (
      isSignup &&
      password !== confirmPassword
    ) {
      errs.confirmPassword =
        "Passwords do not match.";
    }

    return errs;
  }

  // Normal Login
  function handleSubmit() {

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      showToast(
        isSignup
          ? "Account created successfully!"
          : "Logged in successfully!"
      );

    }, 1500);
  }

  // Google Login Popup
  function handleGoogleLogin() {

    const popup = window.open(
      "",
      "GoogleLoginPopup",
      "width=500,height=650,left=450,top=80"
    );

    if (!popup) {
      showToast("Please allow popups.");
      return;
    }

    popup.document.write(`
      <html>
        <head>
          <title>Google Sign In</title>

          <style>

            *{
              margin:0;
              padding:0;
              box-sizing:border-box;
              font-family:Arial,sans-serif;
            }

            body{
              background:#f1f3f4;
              display:flex;
              justify-content:center;
              align-items:center;
              height:100vh;
            }

            .box{
              width:90%;
              max-width:360px;
              background:white;
              border-radius:18px;
              padding:30px;
              box-shadow:0 4px 20px rgba(0,0,0,0.1);
            }

            .logo{
              width:40px;
              height:40px;
              border-radius:50%;
              background:#4285F4;
              color:white;
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:20px;
              font-weight:bold;
              margin-bottom:20px;
            }

            h2{
              font-size:24px;
              margin-bottom:10px;
              color:#202124;
            }

            p{
              color:#5f6368;
              margin-bottom:20px;
              font-size:14px;
            }

            .account{
              padding:12px;
              border:1px solid #dadce0;
              border-radius:12px;
              margin-bottom:14px;
              cursor:pointer;
              transition:0.2s;
            }

            .account:hover{
              background:#f8f9fa;
            }

            input{
              width:100%;
              padding:14px;
              border:1px solid #dadce0;
              border-radius:10px;
              outline:none;
              margin-bottom:16px;
              font-size:15px;
            }

            button{
              width:100%;
              padding:14px;
              border:none;
              background:#1a73e8;
              color:white;
              border-radius:10px;
              font-size:15px;
              cursor:pointer;
            }

            button:hover{
              background:#1765cc;
            }

          </style>
        </head>

        <body>

          <div class="box">

            <div class="logo">G</div>

            <h2>Sign in</h2>

            <p>Choose an account to continue</p>

            <div class="account" onclick="showPassword()">
              demoaccount@gmail.com
            </div>

            <div class="account" onclick="showPassword()">
              pinterestuser@gmail.com
            </div>

            <div id="passwordArea" style="display:none;">

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />

              <button onclick="login()">
                Next
              </button>

            </div>

          </div>

          <script>

            function showPassword(){
              document.getElementById("passwordArea").style.display = "block";
            }

            function login(){

              const password =
                document.getElementById("password").value;

              if(password.length < 6){
                alert("Enter valid password");
                return;
              }

              window.opener.postMessage(
                {
                  type:"google-success"
                },
                "*"
              );

              window.close();
            }

          </script>

        </body>
      </html>
    `);

    window.addEventListener(
      "message",
      (event) => {

        if (
          event.data &&
          event.data.type === "google-success"
        ) {

          showToast("Google login successful!");

        }
      },
      { once: true }
    );
  }

  // Forgot Password
  function handleForgotPassword() {

    if (!validateEmail(email)) {

      setErrors((e) => ({
        ...e,
        email: "Enter your email first.",
      }));

      return;
    }

    showToast(
      `Password reset link sent to ${email}`
    );
  }

  return (

    <div className={styles.container}>

      {/* Navbar */}

      <div className={styles.navbar}>

        <div className={styles.logoArea}>

          <div className={styles.logo}>
            P
          </div>

          <h2>Pinterest</h2>

        </div>

        <button
          className={styles.topButton}
          onClick={switchMode}
          type="button"
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>

      </div>

      {/* Card */}

      <div className={styles.card}>

        <h1>
          {isSignup
            ? "Sign up to Pinterest"
            : "Log in to Pinterest"}
        </h1>

        {/* Google Button */}

        <button
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          type="button"
        >

          <span className={styles.googleIcon}>
            <GoogleSVG />
          </span>

          Continue with Google

        </button>

        <div className={styles.or}>
          OR
        </div>

        {/* Signup Name */}

        {isSignup && (
          <>

            <input
              type="text"
              placeholder="Full name"
              className={`${styles.input} ${
                errors.name
                  ? styles.inputError
                  : ""
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                setErrors((er) => ({
                  ...er,
                  name: "",
                }));
              }}
            />

            {errors.name && (
              <span className={styles.fieldError}>
                {errors.name}
              </span>
            )}

          </>
        )}

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          className={`${styles.input} ${
            errors.email
              ? styles.inputError
              : ""
          }`}
          value={email}
          onChange={(e) => {

            setEmail(e.target.value);

            setErrors((er) => ({
              ...er,
              email: "",
            }));
          }}
        />

        {errors.email && (
          <span className={styles.fieldError}>
            {errors.email}
          </span>
        )}

        {/* Password */}

        <div
          className={`${styles.passwordBox} ${
            errors.password
              ? styles.inputError
              : ""
          }`}
        >

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => {

              setPassword(e.target.value);

              setErrors((er) => ({
                ...er,
                password: "",
              }));
            }}
          />

          <button
            className={styles.eye}
            type="button"
            onClick={() =>
              setShowPassword((s) => !s)
            }
          >
            {showPassword
              ? <EyeClosed />
              : <EyeOpen />}
          </button>

        </div>

        {errors.password && (
          <span className={styles.fieldError}>
            {errors.password}
          </span>
        )}

        {/* Confirm Password */}

        {isSignup && (
          <>

            <input
              type="password"
              placeholder="Confirm Password"
              className={`${styles.input} ${
                errors.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
              value={confirmPassword}
              onChange={(e) => {

                setConfirmPassword(
                  e.target.value
                );

                setErrors((er) => ({
                  ...er,
                  confirmPassword: "",
                }));
              }}
            />

            {errors.confirmPassword && (
              <span className={styles.fieldError}>
                {errors.confirmPassword}
              </span>
            )}

          </>
        )}

        {/* Forgot */}

        {!isSignup && (
          <button
            className={styles.forgot}
            onClick={handleForgotPassword}
            type="button"
          >
            Forgot your password?
          </button>
        )}

        {/* Login Button */}

        <button
          className={styles.loginBtn}
          onClick={handleSubmit}
          disabled={loading}
          type="button"
        >
          {loading
            ? "Loading..."
            : isSignup
            ? "Sign up"
            : "Log in"}
        </button>

        {/* Switch */}

        <p className={styles.switchText}>

          {isSignup
            ? "Already have an account?"
            : "No Account?"}

          <span onClick={switchMode}>
            {isSignup
              ? " Log in"
              : " Sign up"}
          </span>

        </p>

      </div>

      {/* Toast */}

      <div
        className={`${styles.toast} ${
          toast.show
            ? styles.toastShow
            : ""
        }`}
      >
        {toast.msg}
      </div>

    </div>
  );
}
