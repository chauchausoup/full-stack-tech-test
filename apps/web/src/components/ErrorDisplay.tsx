import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="p-4 text-red-500 bg-red-100 border border-red-200 rounded">
      <p className="font-semibold">{message}</p>
    </div>
  );
};

export default ErrorDisplay;
