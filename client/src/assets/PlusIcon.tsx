import { FC } from 'react';

interface PlusIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const PlusIcon: FC<PlusIconProps> = ({ width = 12, height = 12, fill = '#fff', className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={fill}
    className={className}
  >
    <path
      fillRule="nonzero"
      d="M11 11H3.75a.75.75 0 000 1.5H11v7.25a.75.75 0 001.5 0V12.5h7.25a.75.75 0 000-1.5H12.5V3.75a.75.75 0 00-1.5 0z"
    />
  </svg>
);

PlusIcon.defaultProps = {
  width: 12,
  height: 12,
  fill: '#fff',
  className: '',
};

export default PlusIcon;
