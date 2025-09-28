import React from 'react';
import styles from './Button.module.css'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const Button: React.FC<Props> = ({ label, className, ...rest }) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...rest}>
      {label}
    </button>
  )
}

export default Button