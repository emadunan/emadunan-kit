import React from 'react';
import styles from './Main.module.css'

interface Props extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <main className={`${styles.main} ${className || ''}`} {...rest}>
      {children || null}
    </main>
  )
}

export default Main;