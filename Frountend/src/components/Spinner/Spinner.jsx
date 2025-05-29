import React from 'react';

const Spinner = () => {
    return (
        <>
            <div className="spinner-wrapper">
                <div className="custom-spinner"></div>
            </div>

            <style jsx="true">{`
       .spinner-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(6px); /* Slight blur effect */
  }

        .custom-spinner {
          width: 5rem;
          height: 5rem;
          border: 0.5em solid rgba(255, 255, 255, 0.2);
          border-top: 0.5em solid #00d4ff;
          border-radius: 50%;
          animation: spin 1s linear infinite, colorShift 3s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes colorShift {
          0% {
            border-top-color: #00d4ff;
          }
          25% {
            border-top-color: #28a745;
          }
          50% {
            border-top-color: #ffc107;
          }
          75% {
            border-top-color: #dc3545;
          }
          100% {
            border-top-color: #00d4ff;
          }
        }
      `}</style>
        </>
    );
};

export default Spinner;
