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

const LogoSVG = () => (
<svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
<path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
</svg>
);

// Toast Hook
function useToast() {
const [toast, setToast] = useState({ msg: "", show: false });
const timer = useRef(null);

const showToast = useCallback((msg) => {
clearTimeout(timer.current);
setToast({ msg, show: true });
timer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2300);
}, []);

return { toast, showToast };
}

// Validation
const validateEmail = (e) => /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(e);
const validatePassword = (p) => p.length >= 6;

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

const switchMode = () => {
setIsSignup(s => !s);
setErrors({});
setName("");
setEmail("");
setPassword("");
setConfirmPassword("");
setShowPassword(false);
};

function validate() {
const errs = {};
if (isSignup && !name.trim()) errs.name = "Name is required.";
if (!validateEmail(email)) errs.email = "Enter a valid email address.";
if (!validatePassword(password)) errs.password = "Password must be at least 6 characters.";
if (isSignup && password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
return errs;
}

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
  showToast(isSignup ? "Account created successfully!" : "Logged in successfully!");  
  // You can redirect or set loggedIn state here  
}, 1600);

}

function handleGoogleLogin() {
setLoading(true);
setTimeout(() => {
setLoading(false);
showToast("Logged in with Google!");
}, 1200);
}

function handleForgotPassword() {
if (!validateEmail(email)) {
setErrors(e => ({ ...e, email: "Enter your email first." }));
return;
}
showToast(Password reset link sent to ${email});
}

return (
<div className={styles.container}>
{/* Navbar */}
<div className={styles.navbar}>
<div className={styles.logoArea}>
<div className={styles.logo}>P</div>
<h2>Pinterest</h2>
</div>
<button className={styles.topButton} onClick={switchMode}>
{isSignup ? "Log in" : "Sign up"}
</button>
</div>

{/* Auth Card */}  
  <div className={styles.card}>  
    <h1>{isSignup ? "Sign up to Pinterest" : "Log in to Pinterest"}</h1>  

    {/* Google Login */}  
    <button className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>  
      <span className={styles.googleIcon}><GoogleSVG /></span>  
      Continue with Google  
    </button>  

    <div className={styles.or}>OR</div>  

    {/* Name (Signup only) */}  
    {isSignup && (  
      <>  
        <input  
          type="text"  
          placeholder="Full name"  
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}  
          value={name}  
          onChange={(e) => { setName(e.target.value); setErrors(er => ({ ...er, name: "" })); }}  
        />  
        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}  
      </>  
    )}  

    {/* Email */}  
    <input  
      type="email"  
      placeholder="Email"  
      className={`${styles.input} ${errors.email ? styles.inputError : ""}`}  
      value={email}  
      onChange={(e) => { setEmail(e.target.value); setErrors(er => ({ ...er, email: "" })); }}  
      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}  
    />  
    {errors.email && <span className={styles.fieldError}>{errors.email}</span>}  

    {/* Password */}  
    <div className={`${styles.passwordBox} ${errors.password ? styles.inputError : ""}`}>  
      <input  
        type={showPassword ? "text" : "password"}  
        placeholder="Password"  
        className={styles.passwordInput}  
        value={password}  
        onChange={(e) => { setPassword(e.target.value); setErrors(er => ({ ...er, password: "" })); }}  
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}  
      />  
      <button className={styles.eye} onClick={() => setShowPassword(s => !s)} type="button">  
        {showPassword ? <EyeClosed /> : <EyeOpen />}  
      </button>  
    </div>  
    {errors.password && <span className={styles.fieldError}>{errors.password}</span>}  

    {/* Confirm Password (Signup only) */}  
    {isSignup && (  
      <>  
        <input  
          type="password"  
          placeholder="Confirm Password"  
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}  
          value={confirmPassword}  
          onChange={(e) => { setConfirmPassword(e.target.value); setErrors(er => ({ ...er, confirmPassword: "" })); }}  
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}  
        />  
        {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}  
      </>  
    )}  

    {/* Forgot Password */}  
    {!isSignup && (  
      <button className={styles.forgot} onClick={handleForgotPassword}>  
        Forgot your password?  
      </button>  
    )}  

    {/* Submit Button */}  
    <button className={styles.loginBtn} onClick={handleSubmit} disabled={loading}>  
      {loading ? <span className={styles.spinner} /> : (isSignup ? "Sign up" : "Log in")}  
    </button>  

    {/* Extra Options */}  
    {!isSignup && (  
      <>  
        <p className={styles.facebook}>Facebook login is no longer available</p>  
        <button className={styles.updateBtn} onClick={() => showToast("Please use email or Google to log in.")}>  
          Update login method  
        </button>  
      </>  
    )}  

    {/* Switch Mode */}  
    <p className={styles.switchText}>  
      {isSignup ? "Already have an account?" : "No Account?"}  
      <span onClick={switchMode}>{isSignup ? " Log in" : " Sign up"}</span>  
    </p>  

    <button className={styles.business} onClick={() => showToast("Business signup — coming soon!")}>  
      Are you a business? Get started here!  
    </button>  

    <p className={styles.terms}>  
      By continuing, you agree to Pinterest's{" "}  
      <a href="#" onClick={(e) => { e.preventDefault(); showToast("Terms of Service"); }}>Terms of Service</a>{" "}  
      and acknowledge you've read our{" "}  
      <a href="#" onClick={(e) => { e.preventDefault(); showToast("Privacy Policy"); }}>Privacy Policy</a>.  
    </p>  
  </div>  

  {/* Toast Notification */}  
  <div className={`${styles.toast} ${toast.show ? styles.toastShow : ""}`}>  
    {toast.msg}  
  </div>  
</div>

);
}
