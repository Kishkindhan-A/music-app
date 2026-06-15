import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isRightSidebarOpen: boolean;
  toggleRightSidebar: () => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        isRightSidebarOpen,
        toggleRightSidebar,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
