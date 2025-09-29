import React from "react";
import styles from "./Backdrop.module.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Backdrop: React.FC<Props> = ({ className, onClick, ...rest }) => {
  return (
    <div
      className={`${styles.backdrop} ${className || ""}`}
      onClick={onClick}
      {...rest}
    />
  );
};

export default Backdrop;
