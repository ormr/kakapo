import React from 'react';

const Logo = () => (
  <div className="font-bold text-xl flex gap-3">
    <img src="/logo128.png" width={32} height={32} alt="Logotype" />
    <div>
      <span className="text-[#ff9100]">K</span>
      <span className="text-[#fabe2c]">a</span>
      <span className="text-[#9cdd05]">k</span>
      <span className="text-[#fabe2c]">a</span>
      <span className="text-[#9cdd05]">p</span>
      <span className="text-[#563941]">o</span>
    </div>
    <div className="hidden">Kapako</div>
  </div>
);

export default Logo;
