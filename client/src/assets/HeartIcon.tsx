import React, { FC } from 'react';

interface HeartIconProps {
  fill?: boolean;
}

const HeartIcon: FC<HeartIconProps> = ({ fill }) =>
  fill ? (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="red"
    >
      <path
        d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
        fillRule="nonzero"
      />
    </svg>
  ) : (
    <svg
      fillRule="evenodd"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      strokeMiterlimit="2"
      clipRule="evenodd"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="nonzero"
        d="M7.234 3.004C4.582 3.004 2 4.833 2 8.181c0 3.725 4.345 7.727 9.303 12.54a.996.996 0 001.394 0C17.674 15.89 22 11.907 22 8.181c0-3.353-2.58-5.168-5.229-5.168A5.692 5.692 0 0012 5.567a5.686 5.686 0 00-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7a.752.752 0 001.223.003c.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
      />
    </svg>
  );

HeartIcon.defaultProps = {
  fill: false,
};

export default HeartIcon;
