import React from "react";
import styles from "./Select.module.css";

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  children: React.ReactNode;
  error?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const Select: React.FC<SelectProps> & { Option: typeof Option } = ({
  children,
  error,
  label,
  size = "md",
  className,
  ...rest
}) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={`${styles.select} ${className || ""}`} {...rest}>
        {children}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

// Attach sub-component
Select.Option = Option;

export default Select;
