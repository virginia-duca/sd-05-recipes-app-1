import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    const { titulo } = this.props;
    return (
      <div>
        <Link to={'/perfil'}>
          <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{titulo}</h1>
        <img src={searchIcon} alt="Explorar" data-testid="search-top-btn" />
      </div>
    );
  }
}

export default Header;
