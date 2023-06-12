import React from 'react';

const DotIcon = ({ className = "" }) => (
  <svg className={className} width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.8295 2.3416H1.86944" stroke="black" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

DotIcon.defaultProps = {
  className: "",
}

export default DotIcon;
