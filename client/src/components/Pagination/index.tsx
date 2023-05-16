import clsx from 'clsx';
import React, { FC } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';

interface ArrowIconProps {
  className?: string;
}

const ArrowIcon: FC<ArrowIconProps> = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('h-3 w-3', className)}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

ArrowIcon.defaultProps = {
  className: '',
};

const Prev = () => (
  <>
    <span className="sr-only">Prev Page</span>
    <ArrowIcon className="rotate-180" />
  </>
);

const Next = () => (
  <>
    <span className="sr-only">Next Page</span>
    <ArrowIcon />
  </>
);

const Pagination: FC<ReactPaginateProps> = (props) => (
  <ReactPaginate
    {...props}
    nextLabel={<Next />}
    previousLabel={<Prev />}
    pageLinkClassName="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
    previousLinkClassName="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
    nextLinkClassName="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
    breakLabel="..."
    breakLinkClassName="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
    containerClassName="flex justify-center gap-1 text-xs font-medium"
    activeLinkClassName="!border-lightgreen !bg-lightgreen !text-white"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
