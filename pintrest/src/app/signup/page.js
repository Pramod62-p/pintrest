"use client";

import styles from "./page.module.css";

export default function SignupPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Success");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <div className={styles.logo}>A</div>

        <h1 className={styles.title}>Create Account</h1>

        <p className={styles.subtitle}>
          Sign up to get started
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Full Name"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              required
            />
          </div>

          <label className={styles.terms}>
            <input type="checkbox" required />
            I agree to the Terms & Conditions
          </label>

          <button type="submit" className={styles.button}>
            Create Account
          </button>

          <p className={styles.footer}>
            Already have an account? <span>Login</span>
          </p>

        </form>
      </div>
    </div>
  );
}
