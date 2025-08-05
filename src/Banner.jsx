  // Banner.js
  import React from 'react';
  import './Banner.css';

  function Banner() {
    return (
      <div className="banner">
        <div className="slider">
          <img src="/public/Banner-1.jpg " alt="Banner 1" className="banner-image" />
          <img src="/public/Banner-2.avif" alt="Banner 2" className="banner-image" />
          <img src="/public/Banner-3.jpg" alt="Banner 3" className="banner-image" />
          <img src="/public/Banner-4.jpg" alt="Banner 4" className="banner-image" />
        </div>
      </div>
    );
  }

  export default Banner;
