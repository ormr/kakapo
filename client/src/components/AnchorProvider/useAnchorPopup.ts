import { useContext, createContext } from 'react';

export const AnchorContext = createContext({} as any);

export function useAnchorPopup() {
  const context = useContext(AnchorContext);
  return context;
}
