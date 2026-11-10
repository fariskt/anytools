import React from 'react';

const DownloadButton = ({isLoading}) => {
  return (
    <button type='submit' disabled={isLoading} className="mt-7 cursor-pointer relative flex items-center gap-2 text-white font-medium text-[17px] px-5 py-3 bg-[#675c9c] rounded-lg shadow-lg hover:shadow-xl active:shadow-md transition-shadow duration-200 group">
      {/* Side lines */}
      <span className="absolute left-0 h-[40%] w-1 bg-white rounded-tr-md rounded-br-md transition-all duration-200 group-hover:h-[60%]" />
      <span className="absolute right-0 h-[40%] w-1 bg-white rounded-tl-md rounded-bl-md transition-all duration-200 group-hover:h-[60%]" />

      {/* Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" height={16} width={20} viewBox="0 0 640 512" className="w-[25px]">
        <path
          d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z"
          fill="white"
        />
      </svg>

      <span>Convert & Download</span>
    </button>
  );
};

export default DownloadButton;
