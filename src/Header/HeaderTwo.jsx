import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

class HeaderTwo extends React.Component {
  render() {
    const { titulo } = this.props;
    return (
      <div>
        <Link to='/perfil'>
          <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{titulo}</h1>
      </div>
    );
  }
}

export default HeaderTwo;
