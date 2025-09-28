import React from 'react';
import styles from "./Footer.module.css";

interface Props extends React.HTMLAttributes<HTMLElement>{
  children: React.ReactNode;
}

const Footer: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <footer className={`${styles.footer} ${className || ''}`} {...rest}>
      {children}
    </footer>
  )
}

export default Footer;