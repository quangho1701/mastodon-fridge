import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ColorTokens } from './colors';
import { typography, TypographyTokens } from './typography';
import { spacing, layout } from './spacing';

export interface Theme {
  dark: boolean;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: typeof spacing;
  layout: typeof layout;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<'light' | 'dark' | null>(null);

  const isDark = override ? override === 'dark' : systemScheme === 'dark';

  const theme = useMemo<Theme>(
    () => ({
      dark: isDark,
      colors: isDark ? darkColors : lightColors,
      typography,
      spacing,
      layout,
    }),
    [isDark],
  );

  const toggleTheme = () => {
    setOverride((prev) => {
      if (prev === null) return isDark ? 'light' : 'dark';
      return prev === 'light' ? 'dark' : 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
