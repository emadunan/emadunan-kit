import React, { useEffect, useRef } from "react";
import styles from "./Input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  allowWheelChange?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  size = "md",
  className,
  allowWheelChange = false,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input || rest.type !== "number" || allowWheelChange) return;

    const preventWheelChange = (event: WheelEvent) => {
      if (document.activeElement !== input) return;
      event.preventDefault();
      input.blur();
    };

    input.addEventListener("wheel", preventWheelChange, { passive: false });
    return () => input.removeEventListener("wheel", preventWheelChange);
  }, [allowWheelChange, rest.type]);

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        ref={inputRef}
        className={`${styles.input} ${error ? styles.errorInput : ""} ${className || ""}`}
        {...rest}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
