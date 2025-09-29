import React from "react";
import styles from "./Input.module.css";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const Input: React.FC<Props> = ({ label, error, size = "md", className, ...rest }) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={`${styles.input} ${error ? styles.errorInput : ""} ${className || ""}`}
        {...rest}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};



export default Input;
