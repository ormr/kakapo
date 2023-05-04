import React, { ReactNode } from 'react';

interface WrapperProps {
  show: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  children: ReactNode;
}

const AnchorWrapper = React.forwardRef(({ show, x, y, width, height, children }: WrapperProps, ref: any) => (
  <div
    ref={ref}
    id="anchor"
    className="z-50 fixed"
    style={{
      display: show ? 'block' : 'none',
      top: y ? `${y}px` : 0,
      left: x ? `${x}px` : 0,
      width: width && `${width}px`,
      height: height && `${height}px`,
    }}
  >
    {children}
  </div>
));

export default AnchorWrapper;
