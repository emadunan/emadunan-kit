import React from "react";
import styles from "./Logo.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Logo: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <figure className={`${styles.logo} ${className || ""}`} {...rest}>
      {children}
    </figure>
  );
};

export default Logo;
