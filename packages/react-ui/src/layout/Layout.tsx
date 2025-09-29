import React from "react";
import styles from "./Layout.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <div className={`${styles.layout} ${className || ""}`} {...rest}>{children}</div>
  );
};

export default Layout;
