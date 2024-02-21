'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppSettingsContextProps {
  toggleIntro: boolean;
  setToggleIntro: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppSettingsContext = createContext<AppSettingsContextProps | undefined>(undefined);

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({ children }) => {
  const [toggleIntro, setToggleIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const contextValue: AppSettingsContextProps = {
    toggleIntro,
    setToggleIntro,
    darkMode,
    setDarkMode,
  };

  return (
    <AppSettingsContext.Provider value={contextValue}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export const useAppSettings = (): AppSettingsContextProps => {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
