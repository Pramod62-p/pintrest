"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.box}>
        <h2 className={styles.title}>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}
