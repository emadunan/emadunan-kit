import React, { useState, useEffect, useRef } from 'react';
import styles from './AutocompleteInput.module.css';

interface Suggestion {
  id: number | string;
  name: string;
}

interface AutocompleteInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onSelect'
  > {
  label?: string;
  placeholder?: string;
  fetchSuggestions: (query: string) => Promise<Suggestion[]>;
  onSelect: (suggestion: Suggestion) => void;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  placeholder,
  fetchSuggestions,
  onSelect,
  error,
  size = 'md',
  ...rest
}) => {
  const [query, setQuery] = useState(rest.value?.toString() || '');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // 🔸 Handle fetch suggestions with debounce
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = window.setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchSuggestions(query);
        setSuggestions(data);
        setShowDropdown(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, fetchSuggestions]);

  // 🔹 When user types directly
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // ⬇️ Fire onSelect with fake ID to indicate new value
    onSelect({ id: 0, name: value });
  };

  // 🔸 When user picks from dropdown
  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
    onSelect(suggestion);
  };

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        {...rest}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}

      {showDropdown && (
        <ul className={`${styles.dropdown} ${styles.fadeIn}`}>
          {loading && <li className={styles.loading}> ... </li>}
          {!loading && suggestions.length === 0 && (
            <li className={styles.noResults}>لا توجد نتائج</li>
          )}
          {!loading &&
            suggestions.map((s) => (
              <li
                key={s.id}
                className={styles.dropdownItem}
                onMouseDown={() => handleSelect(s)} // prevent blur before selection
              >
                {s.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
