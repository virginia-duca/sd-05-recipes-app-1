import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

const Header = () => {
  return (
    <div>
      <Link to={'/perfil'}>
        <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <Link to={'/explorar'}>
        <img src={searchIcon} alt="Explorar" data-testid="search-top-btn" />
      </Link>
    </div>
  );
};

export default Header;
