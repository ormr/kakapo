import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import AnchorPopup from './AnchorPopup';
import { AnchorContext } from './useAnchorPopup';

interface AnchorProviderProps {
  children: ReactNode;
}

const AnchorProvider: FC<AnchorProviderProps> = ({ children }) => {
  const [anchor, setAnchor] = useState({
    show: false,
    component: undefined,
    ref: {},
  });

  const show = useCallback(
    () =>
      setAnchor((prevAnchor) => ({
        ...prevAnchor,
        show: true,
      })),
    []
  );

  const hide = useCallback(
    () =>
      setAnchor((prevAnchor) => ({
        ...prevAnchor,
        show: false,
      })),
    []
  );

  const value = useMemo(
    () => ({
      anchor,
      show,
      hide,
      setAnchor,
    }),
    [hide, anchor, show]
  );

  return (
    <AnchorContext.Provider value={value}>
      {children}
      <AnchorPopup meta={anchor} hide={hide} />
    </AnchorContext.Provider>
  );
};

export default AnchorProvider;
