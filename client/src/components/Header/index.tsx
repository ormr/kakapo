import React, { FC, ReactNode } from 'react';
import EarthIcon from '../../assets/EarthIcon';
import PaperPlaneIcon from '../../assets/PaperPlane';
import Avatar from '../Avatar';
import Container from '../Container';

const Header = () => (
  <Container>
    <div className="flex justify-between items-center py-5">
      <Avatar imageSrc="https://images.unsplash.com/photo-1645378999013-95abebf5f3c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
      <Logo />
      <Tools />
    </div>
  </Container>
);

const Tools = () => (
  <ul className="flex space-x-3">
    <li><a href="/"><EarthIcon /></a></li>
    <li><a href="/"><PaperPlaneIcon /></a></li>
  </ul>
);

const Logo = () => (
  <div className="font-bold text-xl">GorongGoring</div>
);

export default Header;
