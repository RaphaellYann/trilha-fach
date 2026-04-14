"use client";

import React from 'react';
import './index.css';

interface LoadingProps {
  show: boolean;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="spinner-core">
          {/* Logo Centralizado */}
          <img src="/images/engrenagem.png" alt="Logo" className="center-icon" />
          
          <div className="bars-rotate">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="spinner-bar" />
            ))}
          </div>
        </div>
        
        {message && <span className="loading-message">{message}</span>}
      </div>
    </div>
  );
};

export default Loading;