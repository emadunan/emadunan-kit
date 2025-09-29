import React from "react";
import styles from "./Checkbox.module.css";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

const Checkbox: React.FC<Props> = ({
  label,
  error,
  size = "md",
  className,
  ...rest
}) => {
  return (
    <label className={`${styles.wrapper} ${styles[size]} ${className || ""}`}>
      <input type="checkbox" className={styles.checkbox} {...rest} />
      {label && <span className={styles.label}>{label}</span>}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default Checkbox;
