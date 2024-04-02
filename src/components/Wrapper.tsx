"use client";

import { useEffect } from 'react';
import ThemeService from '@/services/ThemeService';

const Wrapper = () => {

  useEffect(() => {
    ThemeService.setThemeFromLocal();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen z-[-10]">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index}
            className="animatedbg-row h-[10%] w-full"
            style={{
              animationDelay: `${index * 0.5}s`,
            }}
            />
        ))}
      </div>
    </>
  );
};

export default Wrapper;
