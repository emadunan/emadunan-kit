import React from "react";
import styles from "./Navbar.module.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const Navbar: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <nav className={`${styles.navbar} ${className || ""}`} {...rest}>
      <ul className={styles.navList}>
        {React.Children.map(children, (child, index) => (
          <li key={index} className={styles.navItem}>
            {child}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
