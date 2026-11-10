import React from 'react';
import './Loader.css'; // Keep the custom loader animation here

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
      <div className="w-[50px] aspect-[1.154] relative loader" />
    </div>
  );
};

export default Loader;
