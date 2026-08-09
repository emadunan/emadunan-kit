import React from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import classicStyles from './Pagination.classic.module.css';
import modernStyles from './Pagination.modern.module.css';

const FirstIcon = FaAngleDoubleLeft as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const PreviousIcon = FaAngleLeft as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const NextIcon = FaAngleRight as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;
const LastIcon = FaAngleDoubleRight as React.ComponentType<
  React.SVGProps<SVGSVGElement>
>;

export interface PaginationLabels {
  navigation?: string;
  prev?: string;
  next?: string;
  first?: string;
  last?: string;
  page?: (page: number) => string;
}

export interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  labels?: PaginationLabels;
  variant?: 'classic' | 'modern';
  className?: string;
}

type PaginationItem = number | 'ellipsis';

function createPaginationItems(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): PaginationItem[] {
  const visiblePages = new Set<number>([1, totalPages]);
  for (
    let page = Math.max(2, currentPage - siblingCount);
    page <= Math.min(totalPages - 1, currentPage + siblingCount);
    page++
  ) {
    visiblePages.add(page);
  }

  const sortedPages = [...visiblePages].sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];
    if (previousPage !== undefined && page - previousPage > 1) {
      items.push('ellipsis');
    }
    items.push(page);
  });

  return items;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  pageSize,
  currentPage,
  onChange,
  siblingCount = 1,
  labels,
  variant = 'classic',
  className,
}) => {
  const styles = variant === 'modern' ? modernStyles : classicStyles;
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const totalPages = Math.ceil(Math.max(0, total) / safePageSize);
  if (totalPages <= 1) return null;

  const page = Math.min(totalPages, Math.max(1, Math.floor(currentPage)));
  const items = createPaginationItems(
    totalPages,
    page,
    Math.max(0, Math.floor(siblingCount)),
  );
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const rootClassName = [styles.pagination, className]
    .filter(Boolean)
    .join(' ');

  const goTo = (nextPage: number) => {
    const boundedPage = Math.min(totalPages, Math.max(1, nextPage));
    if (boundedPage !== page) onChange(boundedPage);
  };

  return (
    <nav
      className={rootClassName}
      aria-label={labels?.navigation ?? 'Pagination'}
    >
      <button
        type="button"
        className={`${styles.button} ${styles.boundaryButton}`}
        onClick={() => goTo(1)}
        disabled={isFirstPage}
        aria-label={labels?.first ?? 'First page'}
      >
        <FirstIcon className={styles.icon} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={styles.button}
        onClick={() => goTo(page - 1)}
        disabled={isFirstPage}
        aria-label={labels?.prev ?? 'Previous page'}
      >
        <PreviousIcon className={styles.icon} aria-hidden="true" />
      </button>

      <ul className={styles.pageList}>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li
              key={`ellipsis-${index}`}
              className={styles.dots}
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={`${styles.pageButton} ${item === page ? styles.active : ''}`}
                onClick={() => goTo(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={labels?.page?.(item) ?? `Page ${item}`}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        className={styles.button}
        onClick={() => goTo(page + 1)}
        disabled={isLastPage}
        aria-label={labels?.next ?? 'Next page'}
      >
        <NextIcon className={styles.icon} aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`${styles.button} ${styles.boundaryButton}`}
        onClick={() => goTo(totalPages)}
        disabled={isLastPage}
        aria-label={labels?.last ?? 'Last page'}
      >
        <LastIcon className={styles.icon} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
