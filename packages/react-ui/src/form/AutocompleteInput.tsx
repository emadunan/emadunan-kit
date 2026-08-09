import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import styles from './AutocompleteInput.module.css';

export interface AutocompleteInputProps<T>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onSelect' | 'size' | 'value'
  > {
  value: string;
  fetchSuggestions: (query: string) => Promise<T[]>;
  getSuggestionKey: (suggestion: T) => React.Key;
  getSuggestionLabel: (suggestion: T) => string;
  onValueChange: (value: string) => void;
  onSelect: (suggestion: T) => void;
  renderSuggestion?: (suggestion: T) => ReactNode;
  debounceMs?: number;
  emptyMessage?: ReactNode;
  error?: string;
  label?: string;
  loadingMessage?: ReactNode;
  minimumQueryLength?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function AutocompleteInput<T>({
  value,
  fetchSuggestions,
  getSuggestionKey,
  getSuggestionLabel,
  onValueChange,
  onSelect,
  renderSuggestion = getSuggestionLabel,
  debounceMs = 300,
  disabled,
  emptyMessage = 'لا توجد نتائج',
  error,
  id,
  label,
  loadingMessage = 'جار البحث...',
  minimumQueryLength = 1,
  size = 'md',
  ...inputProps
}: AutocompleteInputProps<T>) {
  const generatedId = useId();
  const inputId = id ?? `autocomplete-${generatedId}`;
  const listboxId = `${inputId}-listbox`;
  const errorId = error ? `${inputId}-error` : undefined;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const query = value.trim();
  const canSearch = !disabled && query.length >= minimumQueryLength;
  const isOpen = isFocused && canSearch;

  useEffect(() => {
    if (!canSearch) {
      requestIdRef.current += 1;
      setSuggestions([]);
      setActiveIndex(-1);
      setIsLoading(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    const timeout = window.setTimeout(() => {
      setIsLoading(true);
      void fetchSuggestions(query)
        .then((results) => {
          if (requestId !== requestIdRef.current) return;
          setSuggestions(results);
          setActiveIndex(results.length ? 0 : -1);
        })
        .catch(() => {
          if (requestId !== requestIdRef.current) return;
          setSuggestions([]);
          setActiveIndex(-1);
        })
        .finally(() => {
          if (requestId === requestIdRef.current) setIsLoading(false);
        });
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [canSearch, debounceMs, fetchSuggestions, query]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  function selectSuggestion(suggestion: T): void {
    onValueChange(getSuggestionLabel(suggestion));
    onSelect(suggestion);
    setIsFocused(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    inputProps.onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'ArrowDown' && isOpen && suggestions.length) {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp' && isOpen && suggestions.length) {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? suggestions.length - 1 : current - 1,
      );
    } else if (event.key === 'Enter' && isOpen && activeIndex >= 0) {
      const suggestion = suggestions[activeIndex];
      if (suggestion) {
        event.preventDefault();
        selectSuggestion(suggestion);
      }
    } else if (event.key === 'Escape') {
      setIsFocused(false);
    }
  }

  return (
    <div ref={wrapperRef} className={`${styles.wrapper} ${styles[size]}`}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <input
        {...inputProps}
        id={inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-controls={isOpen ? listboxId : undefined}
        aria-describedby={errorId}
        aria-expanded={isOpen}
        aria-activedescendant={
          isOpen && activeIndex >= 0
            ? `${listboxId}-option-${activeIndex}`
            : undefined
        }
        aria-invalid={Boolean(error)}
        autoComplete="off"
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        disabled={disabled}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
          setIsFocused(true);
        }}
        onBlur={(event) => {
          setIsFocused(false);
          inputProps.onBlur?.(event);
        }}
        onFocus={(event) => {
          setIsFocused(true);
          inputProps.onFocus?.(event);
        }}
        onKeyDown={handleKeyDown}
      />

      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}

      {isOpen && (
        <ul id={listboxId} className={styles.dropdown} role="listbox">
          {isLoading && (
            <li className={styles.loading} role="presentation">
              {loadingMessage}
            </li>
          )}
          {!isLoading && suggestions.length === 0 && (
            <li className={styles.noResults} role="presentation">
              {emptyMessage}
            </li>
          )}
          {!isLoading &&
            suggestions.map((suggestion, index) => (
              <li
                id={`${listboxId}-option-${index}`}
                key={getSuggestionKey(suggestion)}
                aria-selected={index === activeIndex}
                className={`${styles.dropdownItem} ${
                  index === activeIndex ? styles.activeDropdownItem : ''
                }`}
                role="option"
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectSuggestion(suggestion)}
              >
                {renderSuggestion(suggestion)}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
