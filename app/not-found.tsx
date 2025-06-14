"use client";
import React from "react";
import styles from "./../css/NotFound.module.css";
import Image from "next/image";
// import logo from "../../assets/img/logo.png";

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.notfound_404}>
            <h1>404</h1>
          </div>
          <p className={styles.fadeInText}>
            Oops! The page you`&apos;` re looking for doesn`&apos;`t exist.
          </p>
          <a href="/" className={styles.backButton}>
            Go back to Home
          </a>
        </div>
        <div className={styles.illustration}>
          <Image
            src="/images/logo.png"
            alt="404 Illustration"
            width={400}
            height={400}
            className={styles.logo}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
