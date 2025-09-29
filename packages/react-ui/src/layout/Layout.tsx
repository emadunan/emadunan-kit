import React from "react";
import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`${styles.layout} ${className || ""}`}>{children}</div>
  );
};

export default Layout;
