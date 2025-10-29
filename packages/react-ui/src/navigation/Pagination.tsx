import React from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';
import classicStyles from './Pagination.classic.module.css';
import modernStyles from './Pagination.modern.module.css';

export interface PaginationLabels {
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
}

export interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  labels?: PaginationLabels;
  variant?: 'classic' | 'modern';
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageSize,
  currentPage,
  onChange,
  siblingCount = 1,
  labels,
  variant = 'classic',
}) => {
  // pick the right CSS module object
  const styles = variant === 'modern' ? modernStyles : classicStyles;

  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // simple case: show all pages
  if (totalPages <= 5 + siblingCount * 2) {
    return (
      <nav className={styles.pagination}>
        <button
          className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          aria-label={labels?.first ?? 'First'}
        >
          <FaAngleDoubleLeft />
          {labels?.first && <span>{labels.first}</span>}
        </button>

        <button
          className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={labels?.prev ?? 'Previous'}
        >
          <FaAngleLeft />
          {labels?.prev && <span>{labels.prev}</span>}
        </button>

        <ul className={styles.pageList}>
          {range(1, totalPages).map((p) => (
            <li key={p}>
              <button
                className={`${styles.pageButton} ${p === currentPage ? styles.active : ''}`}
                onClick={() => onChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label={labels?.next ?? 'Next'}
        >
          {labels?.next && <span>{labels.next}</span>}
          <FaAngleRight />
        </button>

        <button
          className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => onChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label={labels?.last ?? 'Last'}
        >
          {labels?.last && <span>{labels.last}</span>}
          <FaAngleDoubleRight />
        </button>
      </nav>
    );
  }

  // complex case (ellipsis)
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  const pages: (number | '...')[] = [];

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount);
    pages.push(...leftRange, '...', totalPages);
  } else if (showLeftDots && !showRightDots) {
    const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
    pages.push(1, '...', ...rightRange);
  } else if (showLeftDots && showRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    pages.push(1, '...', ...middleRange, '...', totalPages);
  }

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => onChange(1)}
        disabled={currentPage === 1}
        aria-label={labels?.first ?? 'First'}
      >
        <FaAngleDoubleLeft />
        {labels?.first && <span>{labels.first}</span>}
      </button>

      <button
        className={`${styles.button} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={labels?.prev ?? 'Previous'}
      >
        <FaAngleLeft />
        {labels?.prev && <span>{labels.prev}</span>}
      </button>

      <ul className={styles.pageList}>
        {pages.map((p, i) =>
          p === '...' ? (
            <li key={`dots-${i}`} className={styles.dots}>
              ...
            </li>
          ) : (
            <li key={p}>
              <button
                className={`${styles.pageButton} ${p === currentPage ? styles.active : ''}`}
                onClick={() => onChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={labels?.next ?? 'Next'}
      >
        {labels?.next && <span>{labels.next}</span>}
        <FaAngleRight />
      </button>

      <button
        className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => onChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label={labels?.last ?? 'Last'}
      >
        {labels?.last && <span>{labels.last}</span>}
        <FaAngleDoubleRight />
      </button>
    </nav>
  );
};

export default Pagination;
