import { FC, SVGProps } from 'react';

interface ReportIconProps {
  active?: boolean;
}

const ReportIcon: FC<ReportIconProps & SVGProps<SVGSVGElement>> = ({ active, ...props }) =>
  active ? (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#9CDD05" stroke="#e9f7c6" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#9CDD05" stroke="#e9f7c6" strokeWidth="2" />
      <path d="M8 12H12" stroke="#e9f7c6" strokeWidth="2" />
    </svg>
  ) : (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="8" width="10" height="8" fill="#e9f7c6" stroke="#9CDD05" strokeWidth="2" />
      <rect x="4" y="4" width="12" height="4" fill="#e9f7c6" stroke="#9CDD05" strokeWidth="2" />
      <path d="M8 12H12" stroke="#9CDD05" strokeWidth="2" />
    </svg>
  );

export default ReportIcon;
