import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import AnchorWrapper from './AnchorWrapper';

interface AnchorPopupProps {
  meta: any;
  hide: any;
}

const AnchorPopup: FC<AnchorPopupProps> = ({ meta, hide }) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const getPosition = useCallback(() => {
    if (meta?.ref?.current) {
      const { x, bottom: y } = meta?.ref?.current?.getBoundingClientRect();
      setPosition({ x, y });
    }
  }, [meta?.ref]);

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  useEffect(() => {
    window.addEventListener('resize', getPosition);
  }, [getPosition]);

  const anchorRef = useRef<any>();
  useOutsideClick(anchorRef, () => hide());

  return (
    <AnchorWrapper
      ref={anchorRef}
      show={meta.show}
      {...position}
      width={meta?.ref?.current?.clientWidth}
      height={meta?.ref?.current?.clientHeight}
    >
      {meta.component}
    </AnchorWrapper>
  );
};

export default AnchorPopup;
