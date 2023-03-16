import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import EarthIcon from '../../assets/EarthIcon';
import PaperPlaneIcon from '../../assets/PaperPlane';
import Avatar from '../Avatar';
import Container from '../Container';

const Header = () => (
  <Container>
    <div className="flex justify-between items-center py-5">
      <Link to="/profile">
        <Avatar imageSrc="/default-picture.jpg" />
      </Link>
      <Link to="/">
        <Logo />
      </Link>
      <Tools />
    </div>
  </Container>
);

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

const Logo = () => <div className="font-bold text-xl">GorongGoring</div>;

export default Header;
