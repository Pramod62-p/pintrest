"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function AuthPage() {

const [showPassword, setShowPassword] = useState(false);
const [isSignup, setIsSignup] = useState(false);

const [formData, setFormData] = useState({
fullName: "",
username: "",
email: "",
password: "",
confirmPassword: "",
});

// Handle Input Change

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

// Login / Signup Submit

const handleSubmit = () => {

if (!formData.email || !formData.password) {  
  alert("Please fill all required fields");  
  return;  
}  

if (isSignup) {  

  if (  
    !formData.fullName ||  
    !formData.username ||  
    !formData.confirmPassword  
  ) {  
    alert("Please fill all signup fields");  
    return;  
  }  

  if (formData.password !== formData.confirmPassword) {  
    alert("Passwords do not match");  
    return;  
  }  

  alert("Account Created Successfully!");  
}  

else {  
  alert("Login Successful!");  
}

};

// Google Login

const handleGoogleLogin = () => {
alert("Google Login Clicked");
};

// Forgot Password

const handleForgotPassword = () => {
alert("Redirecting to Forgot Password Page");
};

// Update Login Method

const handleUpdateMethod = () => {
alert("Redirecting to Update Login Method");
};

// Business Button

const handleBusiness = () => {
alert("Business Page Opened");
};

return (

<div className={styles.container}>  

  {/* Navbar */}  

  <div className={styles.navbar}>  

    <div className={styles.logoSection}>  
      <div className={styles.logo}>P</div>  
      <span>Pinterest</span>  
    </div>  

    <button  
      type="button"  
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

    {/* Google Button */}  

    <button  
      type="button"  
      className={styles.googleBtn}  
      onClick={handleGoogleLogin}  
    >  
      <span className={styles.googleIcon}>  
        G  
      </span>  

      Continue with Google  
    </button>  

    <div className={styles.or}>  
      OR  
    </div>  

    {/* Signup Fields */}  

    {isSignup && (  
      <input  
        type="text"  
        name="fullName"  
        placeholder="Full Name"  
        className={styles.input}  
        value={formData.fullName}  
        onChange={handleChange}  
      />  
    )}  

    <input  
      type="email"  
      name="email"  
      placeholder="Email"  
      className={styles.input}  
      value={formData.email}  
      onChange={handleChange}  
    />  

    {isSignup && (  
      <input  
        type="text"  
        name="username"  
        placeholder="Username"  
        className={styles.input}  
        value={formData.username}  
        onChange={handleChange}  
      />  
    )}  

    {/* Password */}  

    {/* Password */}

<div className={styles.passwordWrapper}>  <input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
className={styles.input}
value={formData.password}
onChange={handleChange}
/>

<span
className={styles.eye}
onClick={() => setShowPassword(!showPassword)}

> 

👁

  </span>  </div>  {/* Confirm Password */}  

    {isSignup && (  
      <input  
        type="password"  
        name="confirmPassword"  
        placeholder="Confirm Password"  
        className={styles.input}  
        value={formData.confirmPassword}  
        onChange={handleChange}  
      />  
    )}  

    {/* Forgot Password */}  

    {!isSignup && (  
      <button  
        type="button"  
        className={styles.forgotBtn}  
        onClick={handleForgotPassword}  
      >  
        Forgot your password?  
      </button>  
    )}  

    {/* Terms */}  

    {isSignup && (  
      <label className={styles.termsCheck}>  
        <input type="checkbox" />  
        I agree to Terms & Conditions  
      </label>  
    )}  

    {/* Login / Signup Button */}  

    <button  
      type="button"  
      className={styles.loginBtn}  
      onClick={handleSubmit}  
    >  
      {isSignup ? "Create Account" : "Log in"}  
    </button>  

    {/* Bottom Section */}  

    {!isSignup ? (  
      <>  

        <p className={styles.info}>  
          Facebook login is no longer available  
        </p>  

        <button  
          type="button"  
          className={styles.updateBtn}  
          onClick={handleUpdateMethod}  
        >  
          Update login method  
        </button>  

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

    <button  
      type="button"  
      className={styles.businessBtn}  
      onClick={handleBusiness}  
    >  
      Are you a business?  
      <span>  
        {" "}Get started here!  
      </span>  
    </button>  

    <p className={styles.terms}>  
      By continuing, you agree to Pinterest's  
      Terms of Service and acknowledge you've  
      read our Privacy Policy.  
    </p>  

  </div>  
</div>

);
}
