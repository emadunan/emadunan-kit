import React from "react";
import styles from "./Spinner.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const Spinner: React.FC<Props> = ({ size = "md", color, className }) => {
  return (
    <div
      className={`${styles.spinner} ${styles[size]} ${className || ""}`}
      role="status"
      aria-label="Loading"
      style={color ? { borderTopColor: color } : {}}
    >
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};

export default Spinner;
