"use client"; // Error components must be Client Components

import { useEffect } from "react";
import styles from "./../css/NotFound.module.css";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.text}>
          <div className={styles.notfound_404}>
            {/* <div>Something went wrong</div> */}
          </div>
          <p className={styles.fadeInText}>
            <div className="text-4xl">Something went wrong</div>
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
