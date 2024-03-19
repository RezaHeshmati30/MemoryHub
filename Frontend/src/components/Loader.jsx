import React from "react";
import "./css/loader.css";

function Loader() {
  return (
    <div>
      <div className='typewriter'>
        <div className='slide'>
          <i></i>
        </div>
        <div className='paper'></div>
        <div className='keyboard'></div>
      </div>
      <p>we are working on it!</p>
    </div>
  );
}

export default Loader;
