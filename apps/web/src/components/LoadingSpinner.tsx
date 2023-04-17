import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.411 3.589 8 8 8v-2.009a5.97 5.97 0 01-2-.356V17zM20 12a8 8 0 01-8 8v-4.644a5.97 5.97 0 012-.356v-2.009a3.96 3.96 0 00-2-.555 4 4 0 104 4.898v-2.44l2.121-2.122A7.963 7.963 0 0120 12z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
