import React from 'react';

export default function UserCluster() {
  return (
    <div className="user-cluster">
      <button className="circle">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Z" fill="#a6adbb"/>
          <path d="M19 16v-5a7 7 0 1 0-14 0v5l-1.5 1.5A1 1 0 0 0 4 19h16a1 1 0 0 0 .7-1.7L19 16Z" stroke="#a6adbb" strokeWidth="1.5" fill="none"/>
        </svg>
        <span className="dot" />
      </button>
      <img className="avatar circle-img" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Elise`} alt="profile" />
    </div>
  );
}


