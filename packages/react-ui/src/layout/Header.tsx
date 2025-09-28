import React from "react";
import styles from "./Header.module.css";
import { Button } from "../form";

interface Props extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  logo: React.ReactNode;
  nav: React.ReactNode;
  actions: React.ReactNode;
}

const Header: React.FC<Props> = ({
  title,
  logo,
  nav,
  actions,
  className,
  ...rest
}) => {
  return (
    <header className={`${styles.header} ${className || ""}`} {...rest} >
      <div className={styles.logo}>
        {logo}
        {title && <h1>{title}</h1>}
      </div>

      {nav}

      <div className={styles.actions}>
        <Button label="Login" />
      </div>
    </header>
  );
};

export default Header;
