import React, { useState, useEffect, useRef } from 'react';
import styles from './AutocompleteInput.module.css';

interface Suggestion {
  id: number | string;
  name: string;
}

interface AutocompleteInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onSelect'> {
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
  const [initialized, setInitialized] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const skipNextFetchRef = useRef(false);

  // ✅ Fetch suggestions (debounced)
  useEffect(() => {
    // Prevent auto open on initial render
    if (!initialized) return;

    // Skip fetch caused by selection
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchSuggestions(query);
        setSuggestions(data);
        setShowDropdown(true);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [query, fetchSuggestions, initialized]);

  // ✅ Handle outside clicks (label included)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const labelEl = wrapper.querySelector('label');
      if (
        !wrapper.contains(event.target as Node) ||
        (labelEl && labelEl.contains(event.target as Node))
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (!initialized) setInitialized(true);
    if (suggestions.length > 0) setShowDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialized(true);
    const value = e.target.value;
    setQuery(value);
    onSelect({ id: 0, name: value });
  };

  const handleSelect = (suggestion: Suggestion) => {
    skipNextFetchRef.current = true; // prevent reopening
    setQuery(suggestion.name);
    setShowDropdown(false);
    onSelect(suggestion);
  };

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${styles[size]}`}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        {...rest}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        value={query}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
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
                onMouseDown={() => handleSelect(s)}
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
