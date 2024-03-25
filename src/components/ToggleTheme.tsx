"use client";

import { useState } from 'react';
import { Switch } from '@tremor/react';

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  };

  return (
    <Switch
      checked={isDarkMode} 
      onChange={toggleTheme}
      />
  );
};

export default ToggleTheme;
