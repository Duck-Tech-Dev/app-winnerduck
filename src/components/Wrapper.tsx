"use client";

import { useEffect, useState } from 'react';
import ThemeService from '@/services/ThemeService';

const Wrapper = () => {

  useEffect(() => {
    ThemeService.setThemeFromLocal();
  }, []);

  return (
    <>
    </>
  );
};

export default Wrapper;
