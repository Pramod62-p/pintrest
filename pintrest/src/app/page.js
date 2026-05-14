import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page} onClick={() => rout.push("./login")}>Click Here to Login</div>
  );
}
