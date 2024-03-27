"use client";

import { useEffect, useState } from 'react';
import ThemeService from '@/services/ThemeService';

const Wrapper = () => {

  useEffect(() => {
    ThemeService.setThemeFromLocal();
    console.log("Wrapper mounted fella, yeaaah!!");
  }, []);

  return (
    <>
    </>
  );
};

export default Wrapper;
