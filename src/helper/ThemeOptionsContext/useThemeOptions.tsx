import { useContext } from 'react';
import ThemeOptionContext from './index';

export const useThemeOptions = () => {
  const context = useContext(ThemeOptionContext);
  
  if (!context) {
    throw new Error('useThemeOptions must be used within a ThemeOptionProvider');
  }
  
  return context;
};