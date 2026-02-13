import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="animated-pattern">
          <div className="orbit orbit-1"></div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
          <div className="center-dot"></div>
        </div>
        <h2 className="loading-text">CitiTrack</h2>
        <p className="loading-subtitle">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
