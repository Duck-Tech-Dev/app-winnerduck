'use client';

import React from 'react';
import { ClockLoader } from 'react-spinners';

const LoadingScreen: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-1/2 right-1/2">
          <ClockLoader color="#AAAAAA" />
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
