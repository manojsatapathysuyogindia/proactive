
import { createContext } from 'react';
interface ThemeOptions {
  [key: string]: any;
}

// Define the context type
interface ThemeOptionContextType {
  themeOption: ThemeOptions;
  refetchThemeOptions: () => Promise<void>;
  isFetching: boolean;
}

// Create context with default values
const ThemeOptionContext = createContext<ThemeOptionContextType>({
  themeOption: {},
  refetchThemeOptions: async () => {},
  isFetching: false
});
// const ThemeOptionContext = createContext();

export default ThemeOptionContext;
