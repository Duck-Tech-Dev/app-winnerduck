"use client";

import { useEffect, useState } from 'react';
import { Switch } from '@tremor/react';
import ThemeService from '@/services/ThemeService';
import LocalService from '@/services/LocalService';

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const theme = LocalService.getTheme();
    setIsDarkMode(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    ThemeService.toggleTheme();
  };

  return (
    <Switch
      checked={isDarkMode} 
      onChange={toggleTheme}
      />
  );
};

export default ToggleTheme;
