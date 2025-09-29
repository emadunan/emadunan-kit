import React from "react";
import styles from "./Navbar.module.css";

interface NavLink {
  label: string;
  href: string;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  links: NavLink[];
  activeHref?: string;
}

const Navbar: React.FC<Props> = ({ links, activeHref, className, ...rest }) => {
  return (
    <nav className={`${styles.navbar} ${className || ""}`} {...rest}>
      <ul className={styles.navList}>
        {links.map((link, index) => (
          <li key={index} className={styles.navItem}>
            <a
              href={link.href}
              className={`${styles.navLink} ${
                activeHref === link.href ? styles.active : ""
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
