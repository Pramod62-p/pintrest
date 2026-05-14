"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
  <div className={styles.card}>
    
    <div className={styles.logo}>A</div>

    <h1 className={styles.title}>Welcome Back</h1>

    <p className={styles.subtitle}>
      Login to continue your account
    </p>

    <form className={styles.form}>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Username"
          className={styles.input}
        />
      </div>

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

      <div className={styles.row}>
        <label className={styles.remember}>
          <input type="checkbox" />
          Remember me
        </label>

        <a href="#" className={styles.link}>
          Forgot Password?
        </a>
      </div>

      <button type="submit" className={styles.button}>
        Login
      </button>

      <p className={styles.footer}>
        Don&apos;t have an account? <span>Sign Up</span>
      </p>

    </form>
  </div>
</div>
  );
}
