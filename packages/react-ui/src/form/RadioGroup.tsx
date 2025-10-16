// src/components/RadioGroup/RadioGroup.tsx
import React from 'react';
import styles from './RadioGroup.module.css';

interface RadioOption {
  value: string;
  label: string;
}

interface Props {
  name: string;
  legend?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<Props> = ({
  name,
  legend,
  options,
  value,
  onChange,
}) => {
  return (
    <fieldset className={styles.radioGroup}>
      {legend && <legend className={styles.radioLegend}>{legend}</legend>}
      {options.map((option) => (
        <label key={option.value} className={styles.radioOption}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
};

export default RadioGroup;
