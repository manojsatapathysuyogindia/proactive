import React from 'react';
const FallbackPage: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="fallback-overlay">
      <div className="spinner"></div>
      <div className="loading-text">{message}</div>
    </div>
  );
};

export default FallbackPage;