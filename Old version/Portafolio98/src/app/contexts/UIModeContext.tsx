import { createContext, useContext, useState, ReactNode } from 'react';

export type UIMode = 'modern' | 'retro';

interface UIModeContextType {
  mode: UIMode;
  setMode: (mode: UIMode) => void;
  toggleMode: () => void;
}

const UIModeContext = createContext<UIModeContextType | undefined>(undefined);

export function UIModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UIMode>('retro');

  const toggleMode = () => {
    setMode((prev) => (prev === 'modern' ? 'retro' : 'modern'));
  };

  return (
    <UIModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </UIModeContext.Provider>
  );
}

export function useUIMode() {
  const context = useContext(UIModeContext);
  if (context === undefined) {
    throw new Error('useUIMode must be used within a UIModeProvider');
  }
  return context;
}
