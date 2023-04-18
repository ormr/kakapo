import React from 'react';
import EarthIcon from '../../assets/EarthIcon';
import PaperPlaneIcon from '../../assets/PaperPlane';

const Tools = () => (
  <ul className="flex space-x-3">
    <li>
      <a href="/">
        <EarthIcon />
      </a>
    </li>
    <li>
      <a href="/">
        <PaperPlaneIcon />
      </a>
    </li>
  </ul>
);

export default Tools;
