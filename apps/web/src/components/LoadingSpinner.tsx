import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <svg
        className="animate-spin h-10 w-10 text-indigo-500"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2.084c-5.513 0-9.916 4.402-9.916 9.916s4.403 9.916 9.916 9.916 9.916-4.403 9.916-9.916-4.403-9.916-9.916-9.916zM12 20.75c-4.768 0-8.625-3.857-8.625-8.625s3.857-8.625 8.625-8.625 8.625 3.857 8.625 8.625-3.857 8.625-8.625 8.625z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
