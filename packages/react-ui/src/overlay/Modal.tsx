import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import Backdrop from "./Backdrop";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children, className, ...rest }) => {
  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <div
        className={`${styles.modal} ${className || ""}`}
        role="dialog"
        aria-modal="true"
        {...rest}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
