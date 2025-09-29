import React from "react";
import styles from "./Button.module.css";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "success" | "warning" | "error" | "info";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: Size;
  variant?: Variant;
}

const Button: React.FC<Props> = ({
  children,
  size = "md",
  variant = "primary",
  className,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[variant]} ${className || ""}`}
      {...rest}
    >
      {children || "Submit"}
    </button>
  );
};


export default Button;
