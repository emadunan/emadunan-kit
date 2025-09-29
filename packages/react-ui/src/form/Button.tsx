import React from "react";
import styles from "./Button.module.css";

type Size = "sm" | "md" | "lg";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: Size;
}

const Button: React.FC<Props> = ({
  children,
  size = "md",
  className,
  ...rest
}) => {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${className || ""}`}
      {...rest}
    >
      {children || "Submit"}
    </button>
  );
};

export default Button;
