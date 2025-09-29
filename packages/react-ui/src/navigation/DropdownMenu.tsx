import React, { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.css";

export interface DropdownMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> & {
  Item: React.FC<DropdownMenuItemProps>;
  Separator: React.FC;
} = ({ trigger, children, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.dropdown} ${className || ""}`}
      ref={menuRef}
      {...rest}
    >
      <button
        className={styles.trigger}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </button>

      {open && (
        <ul className={styles.menu} role="menu">
          {children}
        </ul>
      )}
    </div>
  );
};

/* ---------- Subcomponents ---------- */
export interface DropdownMenuItemProps {
  onClick: () => void;
  children: React.ReactNode;
}

DropdownMenu.Item = ({ onClick, children }: DropdownMenuItemProps) => (
  <li role="menuitem">
    <button className={styles.menuItem} onClick={onClick}>
      {children}
    </button>
  </li>
);

DropdownMenu.Separator = () => (
  <li role="separator" className={styles.separator} />
);

export default DropdownMenu;
